import React from 'react';
import { useEffect, useState } from 'react';
import { useFetchAllCode } from '../../customize/fetch';
import { deleteSupplierService, getAllSupplier } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import FormSearch from '../../../component/Search/FormSearch';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const ManageSupplier = () => {
    const [keyword, setkeyword] = useState('')
    const [dataSupplier, setdataSupplier] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    useEffect(() => {
        try {
           
            fetchData(keyword);
        } catch (error) {
            console.log(error)
        }

    }, [])
    let fetchData = async (keyword) => {
        let arrData = await getAllSupplier({

           
            limit: PAGINATION.pagerow,
            offset: 0,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataSupplier(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }
    let handleDeleteSupplier = async (event, id) => {
        event.preventDefault();
        let res = await deleteSupplierService({
            data: {
                id: id
            }
        })
        if (res && res.errCode === 0) {
            toast.success("Supplier deleted successfully")
            let arrData = await getAllSupplier({

              
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                keyword:keyword
            })
            if (arrData && arrData.errCode === 0) {
                setdataSupplier(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error("Failed to delete supplier")
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllSupplier({

          
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            keyword:keyword

        })
        if (arrData && arrData.errCode === 0) {
            setdataSupplier(arrData.data)

        }
    }
    let handleSearchSupplier = (keyword) =>{
        fetchData(keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) =>{
        if(keyword === ''){
            fetchData(keyword)
            setkeyword(keyword)
        }
    }
    let handleOnClickExport =async () =>{
        let res = await getAllSupplier({
            limit: '',
            offset: '',
            keyword:''
        })
        if(res && res.errCode == 0){
            await CommonUtils.exportExcel(res.data,"Supplier list","ListSupplier")
        }
       
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Supplier management</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách nhà cung cấp sản phẩm
                </div>
                <div className="card-body">
               
                    <div className='row'>
                    <div  className='col-4'>
                    <FormSearch title={"Supplier name"}  handleOnchange={handleOnchangeSearch} handleSearch={handleSearchSupplier} />
                    </div>
                    <div className='col-8'>
                    <button  style={{float:'right'}} onClick={() => handleOnClickExport()} className="btn btn-success" >Export excel <i class="fa-solid fa-file-excel"></i></button>
                    </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataSupplier && dataSupplier.length > 0 &&
                                    dataSupplier.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <Link to={`/admin/edit-Supplier/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;
                                                    <a href="#" onClick={(event) => handleDeleteSupplier(event, item.id)} >Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Back'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    )
}
export default ManageSupplier;