import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';


import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";



const ReviewModal = (props) => {
    const [inputValues, setInputValues] = useState({
        content: ''
    });


    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({ ...inputValues, ["content"]: '' })

    }
    let handleSaveInfor = () => {
        setInputValues({ ...inputValues, ["content"]: '' })
        props.sendDataFromReViewModal(inputValues.content)
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Write product review feedback</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Feedback</label>
                            <textarea name="content" value={inputValues.content} onChange={(event) => handleOnChange(event)} className="form-control"></textarea>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSaveInfor}
                    >
                        Save information
                    </Button>
                    {' '}
                    <Button onClick={handleCloseModal}>
                    Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    )
}
export default ReviewModal;