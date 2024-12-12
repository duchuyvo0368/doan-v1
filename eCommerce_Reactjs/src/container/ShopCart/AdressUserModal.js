import React from 'react';
import { useEffect, useState } from 'react';
import { getDetailAddressUserByIdService } from '../../services/userService';

import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

const AddressUsersModal = (props) => {
    const [inputValues, setInputValues] = useState({
        shipName: '', shipAddress: '', shipEmail: '', shipPhoneNumber: '', isActionUpdate: false
    });
    useEffect(() => {
        let id = props.addressUserId
        if (id) {
            let fetchDetailAddress = async () => {
                let res = await getDetailAddressUserByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues({
                        ...inputValues, ["isActionUpdate"]: true, ["shipName"]: res.data.shipName, ["shipAddress"]: res.data.shipAddress
                        , ["shipEmail"]: res.data.shipEmail, ["shipPhoneNumber"]: res.data.shipPhoneNumber
                    })
                }
            }
            fetchDetailAddress()
        }


    }, [props.isOpenModal])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleCloseModal = () => {

        props.closeModaAddressUser()
        setInputValues({
            ...inputValues, ["isActionUpdate"]: false, ["shipName"]: '', ["shipAddress"]: ''
            , ["shipEmail"]: '', ["shipPhoneNumber"]: ''
        })
    }
    let handleSaveInfor = () => {
        props.sendDataFromModalAddress({
            shipName: inputValues.shipName,
            shipAddress: inputValues.shipAddress,
            shipEmail: inputValues.shipEmail,
            shipPhoneNumber: inputValues.shipPhoneNumber,
            id: props.addressUserId,
            isActionUpdate: inputValues.isActionUpdate,
        })
        setInputValues({
            ...inputValues,
            ["shipName"]: '',
            ["shipAddress"]: '',
            ["shipEmail"]: '',
            ["shipPhoneNumber"]: '',
            ["isActionUpdate"]: false
        })
    }



    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Địa chỉ mới</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">

                        <div className="col-6 form-group">
                            <label>Full Name</label>
                            <input value={inputValues.shipName} name="shipName" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Phone</label>
                            <input value={inputValues.shipPhoneNumber} name="shipPhoneNumber" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Email</label>
                            <input value={inputValues.shipEmail} name="shipEmail" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Địa chỉ cụ thể</label>
                            <input value={inputValues.shipAddress} name="shipAddress" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSaveInfor}
                    >
                        Lưu thông tin
                    </Button>
                    {' '}
                    <Button onClick={handleCloseModal}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    )
}
export default AddressUsersModal;