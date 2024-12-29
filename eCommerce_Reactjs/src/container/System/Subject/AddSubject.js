import React from 'react';
import { useEffect, useState } from 'react';
import { createAllCodeService, getDetailAllCodeById, UpdateAllCodeService } from '../../../services/userService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddSubject = (props) => {



    const [isActionADD, setisActionADD] = useState(true)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', code: ''
    });
    useEffect(() => {

        if (id) {
            let fetchDetailSubject = async () => {
                setisActionADD(false)
                let AllCode = await getDetailAllCodeById(id)
                if (AllCode && AllCode.errCode === 0) {
                    setInputValues({ ...inputValues, ["value"]: AllCode.data.value, ["code"]: AllCode.data.code })
                }
            }
            fetchDetailSubject()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveSubject = async () => {
        if (isActionADD === true) {
            let res = await createAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                type: 'SUBJECT'
            })
            if (res && res.errCode === 0) {
                toast.success("Topic added successfully")
                setInputValues({
                    ...inputValues,
                    ["value"]: '',
                    ["code"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Failed to add topic")
        } else {
            let res = await UpdateAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Topic updated successfully")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Failed to update topic")
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Topics management</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Add new topic' : 'Update topic information'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Topic name</label>
                                <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Code</label>
                                <input type="text" value={inputValues.code} name="code" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <button type="button" onClick={() => handleSaveSubject()} className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddSubject;