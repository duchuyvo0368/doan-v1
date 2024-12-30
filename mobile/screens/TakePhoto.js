import React, { useState, useEffect } from 'react';
import {
    View,
    Text,

    Image,

    StyleSheet,
    Button,

} from 'react-native';
import { updateImageOrderService } from '../services/userService'
import { Camera } from 'expo-camera';

const TakePhoto = ({ route, navigation }) => {
    const [hasCameraPermission, sethasCameraPermission] = useState(null)
    const [camera, setcamera] = useState(null)
    const [image, setimage] = useState(null)
    const [type, settype] = useState(Camera.Constants.Type.back)
    const { orderId } = route.params;

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            sethasCameraPermission(cameraStatus.status === 'granted')
        })()
    }, [])
    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({ base64: true, quality: 0 })
            data.base64 = "data:image/jpeg;base64," + data.base64
            setimage(data.base64)
            let res = await updateImageOrderService({
                id: orderId,
                image: data.base64
            })

            if (res && res.errCode == 0) {
                alert("Saved image successfully")
            }





        }
    }
    if (hasCameraPermission === false) {
        return <Text>No Camera Access</Text>
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setcamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}


                />
            </View>
            <Button title='Flip the camera'
                onPress={() => {
                    settype(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                }}
            />
            <Button
                title='Take a photo'
                onPress={() => takePicture()}
            ></Button>
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </View>
    );
};

export default TakePhoto;
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',

    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }



});