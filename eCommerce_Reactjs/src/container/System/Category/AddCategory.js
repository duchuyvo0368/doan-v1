import React from 'react';
import { useEffect, useState } from 'react';
import { createAllCodeService, getDetailAllCodeById, UpdateAllCodeService } from '../../../services/userService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddCategory = (props) => {



    const [isActionADD, setisActionADD] = useState(true)


    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', code: ''
    });
    useEffect(() => {

        if (id) {
            let fetchDetailCategory = async () => {
                setisActionADD(false)
                let AllCode = await getDetailAllCodeById(id)
                if (AllCode && AllCode.errCode === 0) {
                    setInputValues({ ...inputValues, ["value"]: AllCode.data.value, ["code"]: AllCode.data.code })
                }
            }
            fetchDetailCategory()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveCategory = async () => {
        if (isActionADD === true) {
            let res = await createAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                type: 'CATEGORY'
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm danh mục thành công")
                setInputValues({
                    ...inputValues,
                    ["value"]: '',
                    ["code"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Thêm danh mục thất bại")
        } else {
            let res = await UpdateAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật danh mục thành công")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Cập nhật danh mục thất bại")
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý danh mục</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm mới danh mục' : 'Cập nhật thông tin danh mục'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Category name</label>
                                <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Code</label>
                                <input type="text" value={inputValues.code} name="code" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <button type="button" onClick={() => handleSaveCategory()} className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddCategory;