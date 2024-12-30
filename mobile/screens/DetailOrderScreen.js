import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
    ScrollView,
    Linking,
    Alert,
    Button
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { confirmOrder, getDetailOrder,updateImageOrderService } from '../services/userService';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
const Tab = createBottomTabNavigator();

const DetailOrderScreen = ({ route, navigation }) => {
    const { orderId } = route.params;

    const [priceShip, setPriceShip] = useState(0);
    const [price, setPrice] = useState(0);
    const [DataOrder, setDataOrder] = useState({});
    const [userData, setUserData] = useState({});
    const [image, setImage] = useState(null); // State for image

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            AsyncStorage.getItem('userData').then((value) => {
                if (value) {
                    setUserData(JSON.parse(value));
                    loadDataOrder();
                }
            });
        });
        return focusHandler;
    }, [navigation]);

    const loadDataOrder = () => {
        if (orderId) {
            const fetchOrder = async () => {
                let order = await getDetailOrder(orderId);
                if (order && order.errCode === 0) {
                    setDataOrder(order.data);
                    setPriceShip(order.data.typeShipData.price);
                    let totalPrice = 0;

                    order.data.orderDetail.forEach((item) => {
                        totalPrice += item.quantity * item.productDetail.discountPrice;
                    });
                    setPrice(totalPrice);
                    const savedPhoto = await AsyncStorage.getItem(`orderPhoto_${orderId}`);
                    if (savedPhoto) {
                        setImage(savedPhoto);
                    }
                }
            };
            fetchOrder();
        }
    };

    const totalPriceDiscount = (price, discount) => {
        try {
            if (discount.typeVoucherOfVoucherData.typeVoucher === "percent") {
                return price - Math.min((price * discount.typeVoucherOfVoucherData.value) / 100, discount.typeVoucherOfVoucherData.maxValue);
            } else {
                return price - discount.typeVoucherOfVoucherData.maxValue;
            }
        } catch (error) {
            console.error(error);
            return price; // trả về giá gốc nếu có lỗi
        }
    };

    const handleSendProduct = async () => {
        const res = await confirmOrder({
            orderId: orderId,
            statusId: 'S5',
            shipperId: userData.id
        });
        if (res && res.errCode === 0) {
            loadDataOrder();
        }
    };

    const handleSuccessShip = async () => {
        if (!image) {
            Alert.alert("Take photos before completing the application");
            return;
        }
    
        const base64Image = await getBase64Image(image);
        if (!base64Image) {
            Alert.alert("Image cannot be converted to Base64.");
            return;
        }
    
        try {
            const dataUri = `data:image/jpeg;base64,${base64Image}`;
            const resUpdateImage = await updateImageOrderService({
                id: orderId,
                image: dataUri,
            });
    
            if (resUpdateImage && resUpdateImage.errCode === 0) {
                const res = await confirmOrder({
                    orderId: orderId,
                    statusId: 'S6',
                    shipperId: userData.id,
                });
    
                if (res && res.errCode === 0) {
                    loadDataOrder();
                    Alert.alert("Success", "Order has been completed!");
                } else {
                    Alert.alert("Error", "Unable to confirm order.");
                }
            } else {
                Alert.alert("Error", "Unable to update order image.");
            }
        } catch (error) {
            console.error("Error in handleSuccessShip: ", error);
            Alert.alert("Error", "An error occurred during processing.");
        }
    };
    
    const getBase64Image = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    resolve(reader.result.split(',')[1]); 
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64: ", error);
            return null; 
        }
    };

    const openMap = async (address) => {
        const provider = Platform.OS === 'ios' ? 'apple' : 'google';
        const link = `http://maps.${provider}.com/?daddr=${address}`;

        try {
            const supported = await Linking.canOpenURL(link);
            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    };

    const pickImage = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus === 'granted' && libraryStatus === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                await savePhoto(result.assets[0].uri);
            }
        } else {
            Alert.alert('Permission Required', 'Permission to access camera or library is required!');
        }
    };

    const savePhoto = async (uri) => {
        try {
            await AsyncStorage.setItem(`orderPhoto_${orderId}`, uri);
            Alert.alert('Success', 'Photo saved successfully!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while saving the photo.');
        }
    };

    return (
        <ScrollView>
            <View contentContainerStyle={styles.container}>
                {DataOrder && DataOrder.typeShipData && (
                    <>
                        <View style={styles.box_top}>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>{DataOrder.typeShipData.type}</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>Single code: {orderId}</Text>
                            </View>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
                                <Text style={{ color: 'white', marginTop: 10 }}>{DataOrder.addressUser.shipName} ({DataOrder.addressUser.shipPhonenumber})</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                                    <Text style={{ color: 'white', marginTop: 10, width: 300 }}>{DataOrder.addressUser.shipAdress}</Text>
                                    <Ionicons onPress={() => openMap(DataOrder.addressUser.shipAdress)} name={"map-outline"} color={'orange'} size={20} />
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', }}>
                                    <Text style={{ color: 'white' }}>Collect money: </Text>
                                    {DataOrder && DataOrder.isPaymentOnlien === 0 ? (
                                        <Text style={{ color: 'orange' }}>{DataOrder && DataOrder.voucherData && DataOrder.voucherId ? totalPriceDiscount(price, DataOrder.voucherData) + priceShip : price + priceShip}$</Text>
                                    ) : (
                                        <Text style={{ color: 'orange' }}>0đ</Text>
                                    )}
                                </View>
                                <Text style={{ marginLeft: 10, color: 'red', fontWeight: '600', padding: 4, borderRadius: 4, backgroundColor: 'white' }}>Get it now</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
                            <Text>Status : {DataOrder.statusOrderData.value}</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', marginTop: 5, padding: 10 }}>
                            <Text style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>Order details</Text>
                            <View style={{ marginTop: 10 }}>
                                {DataOrder.orderDetail && DataOrder.orderDetail.length > 0 && DataOrder.orderDetail.map((item, index) => {
                                    const name = `${item.product.name} - ${item.productDetail.nameDetail} - ${item.productDetailSize.sizeData.value}`;
                                    return (
                                        <View key={item.product.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#75b5d8', borderBottomWidth: 1 }}>
                                            <Text style={styles.text_product}>{name}</Text>
                                            <Text style={styles.text_quantity}>x{item.quantity}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            <Text style={{ marginTop: 10 }}>Order image</Text>
                            {image ? (
                                <Image style={{ width: 200, height: 200 }} source={{ uri: image }} />
                            ) : (
                                <Text>No images yet</Text>
                            )}
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            {DataOrder && DataOrder.statusId === 'S4' && (
                                <FormButton buttonTitle="Nhận đơn" onPress={handleSendProduct} />
                            )}
                            {DataOrder && DataOrder.statusId === 'S5' && (
                                <FormButton buttonTitle="Đã giao hàng" onPress={handleSuccessShip} />
                            )}
                            {DataOrder && !DataOrder.image && DataOrder.statusId == 'S5' &&(
                            <TouchableOpacity onPress={pickImage}>
                                <Text style={styles.buttonText}>Take photos of orders</Text>
                            </TouchableOpacity>
                            )}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default DetailOrderScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    box_top: {
        backgroundColor: '#484e54',
        padding: 10,
    },
    text_product: {
        fontSize: 18,
        color: '#75b5d8',
        fontStyle: 'italic',
        width: 320,
    },
    text_quantity: {
        marginLeft: 20,
        color: 'red',
        fontSize: 18,
    },
    buttonText: {
        color: 'blue',
        marginTop: 20,
        textAlign: 'center',
    },
});
