import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllAddressUserByUserIdService, createNewAddressUserrService, deleteAddressUserService, editAddressUserService } from '../../services/userService';
import AddressUsersModal from '../ShopCart/AdressUserModal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import './AddressUser.scss';
function AddressUser(props) {

    const [dataAddressUser, setdataAddressUser] = useState([])
    const [addressUserId, setaddressUserId] = useState('')
    const [isOpenModalAddressUser, setisOpenModalAddressUser] = useState(false)
    useEffect(() => {
        let userId = props.id
        if (userId) {
            let fetchDataAddress = async () => {
                let res = await getAllAddressUserByUserIdService(userId)
                if (res && res.errCode === 0) {
                    setdataAddressUser(res.data)

                }
            }
            fetchDataAddress()
        }

    }, [])
    let sendDataFromModalAddress = async (data) => {
        setisOpenModalAddressUser(false)
        setaddressUserId('')
        if (data.isActionUpdate === false) {
            let res = await createNewAddressUserrService({
                shipName: data.shipName,
                shipAddress: data.shipAddress,
                shipEmail: data.shipEmail,
                shipPhoneNumber: data.shipPhoneNumber,
                userId: props.id,

            })
            if (res && res.errCode === 0) {
                toast.success("Address added successfully !")
                let res = await getAllAddressUserByUserIdService(props.id)
                if (res && res.errCode === 0) {
                    setdataAddressUser(res.data)
                }
            } else {
                toast.error(res.errMessage)
            }
        } else {
            let res = await editAddressUserService({
                id: data.id,
                shipName: data.shipName,
                shipAddress: data.shipAddress,
                shipEmail: data.shipEmail,
                shipPhoneNumber: data.shipPhoneNumber,
                userId: props.id,
            })
            if (res && res.errCode === 0) {
                toast.success("Address updated successfully !")
                let res = await getAllAddressUserByUserIdService(props.id)
                if (res && res.errCode === 0) {
                    setdataAddressUser(res.data)
                }
            } else {
                toast.error(res.errMessage)
            }
        }

    }
    let closeModaAddressUser = () => {
        setisOpenModalAddressUser(false)
        setaddressUserId('')
    }
    let handleOpenAddressUserModal = async () => {

        setisOpenModalAddressUser(true)
    }
    let handleDeleteAddress = async (id) => {

        let res = await deleteAddressUserService({
            data: {
                id: id,
            }
        })
        if (res && res.errCode === 0) {
            toast.success("Successfully deleted user address")
            let res = await getAllAddressUserByUserIdService(props.id)
            if (res && res.errCode === 0) {
                setdataAddressUser(res.data)

            }
        } else {
            toast.error("Delete user address failed")
        }
    }
    let handleEditAddress = (id) => {
        setaddressUserId(id)
        setisOpenModalAddressUser(true)
    }
    return (

        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-12 border-right border-left">
                    <div className="box-heading">
                        <div className="content-left">
                            <span>My address</span>
                        </div>
                        <div className="content-right">
                            <div onClick={() => handleOpenAddressUserModal()} className="wrap-add-address">
                                <i className="fas fa-plus"></i>
                                <span >Add new address</span>
                            </div>
                        </div>
                    </div>
                    {dataAddressUser && dataAddressUser.length > 0 &&
                        dataAddressUser.map((item, index) => {
                            return (
                                <div key={index} className="box-address-user">
                                    <div className='content-left'>
                                        <div className='box-label'>
                                            <div className='label'>
                                                <div>Full Name</div>
                                                <div>Phone</div>
                                                <div>Address</div>
                                            </div>
                                            <div className='content'>
                                                <div>{item.shipName}</div>
                                                <div>{item.shipPhoneNumber}</div>
                                                <div>{item.shipAddress}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='content-right'>
                                        <span onClick={() => handleEditAddress(item.id)} className='text-underline'>Edit</span>
                                        <span onClick={() => handleDeleteAddress(item.id)} className='text-underline'>Delete</span>
                                    </div>
                                </div>

                            )
                        })
                    }

                </div>
            </div>
            <AddressUsersModal addressUserId={addressUserId} sendDataFromModalAddress={sendDataFromModalAddress} isOpenModal={isOpenModalAddressUser} closeModaAddressUser={closeModaAddressUser} />
        </div>

    );
}

export default AddressUser;

