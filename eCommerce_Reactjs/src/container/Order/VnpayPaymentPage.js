import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useParams,useLocation  } from 'react-router-dom';

import {
    paymentOrderVnpayService
} from '../../services/userService';
import './OrderHomePage.scss';

import { toast } from 'react-toastify';

import CommonUtils from '../../utils/CommonUtils';

function VnpayPaymentPage(props) {
    const [inputValues, setInputValues] = useState({
        orderType: 'billpayment', orderDescription: '', bankCode: '', language: 'vn', amount: ''
    });
    const location = useLocation();
    const handleOnChange = event => {
        const { name, value } = event.target;
        if(name =="amount"){
            return;
        }
        setInputValues({ ...inputValues, [name]: value });

    };
    useEffect(()=>{
        if(location && location.orderData){
            setInputValues({ ...inputValues, ["amount"]: location.orderData.total });
        }
      
       
       
    },[location])
    let handleOnclick = async () =>{
        let res = await paymentOrderVnpayService({
            orderType: inputValues.orderType,
            orderDescription: inputValues.orderDescription,
            bankCode: inputValues.bankCode,
            language: inputValues.language,
            amount: inputValues.amount
        })
        if(res && res.errCode ==200){
            console.log("orderData",location.orderData)
            localStorage.setItem("orderData", JSON.stringify(location.orderData))
        
            window.location.href = res.link
        }
        
    }
    return (

        <>

            <div className="wrap-order">
                <div className="wrap-heading-order">
                    <NavLink to="/" className="navbar-brand logo_h">
                        <img src="/resources/img/logo.png" alt="" />
                    </NavLink>
                    <span>VNPAY Payment</span>
                </div>
               
                <div className="wrap-order-item">
                    <section className="cart_area">
                        <div className="container">
                            <div className="cart_inner">
                            <div className="col-md-12">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Payment information</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Type of goods</label><select value={inputValues.orderType} onChange={(event) => handleOnChange(event)} name="orderType"  id="inputState" className="form-control">
                                
                                <option value='billpayment'>Pay bills</option>
                                </select></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Amount</label><input name="amount" disabled={true} value={inputValues.amount} onChange={(event) => handleOnChange(event)}  type="text" className="form-control" /></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Payment content</label><input value={inputValues.orderDescription} onChange={(event) => handleOnChange(event)} name="orderDescription"   type="text" className="form-control" /></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Bank</label><select value={inputValues.bankCode}  onChange={(event) => handleOnChange(event)} name="bankCode"  id="inputState" className="form-control">
                                
                            <option value=''>  Do not select </option>
                            <option value='VNPAYQR'>  VNPAYQR Bank</option>
                            <option value='NCB'>  NCB Bank</option>
                            <option value='SCB'>  SCB Bank</option>
                            <option value='SACOMBANK'>  SACOMBANK Bank</option>
                            <option value='EXIMBANK'>  EXIMBANK Bank</option>
                            <option value='MSBANK'>  MBBANK Bank</option>
                            <option value='NAMABANK'>  NAMABANK Bank</option>
                            <option value='VISA'>  VISA Bank</option>
                            <option value='VNMART'>  VNMART Bank</option>
                            <option value='VIETINBANK'>  VIETINBANK Bank</option>
                            <option value='VIETCOMBANK'>  VIETCOMBANK Bank</option>
                            <option value='HDBANK'>  HDBANK Bank</option>
                            <option value='DONGABANK'>  Dong A Bank</option>
                            <option value='TPBANK'>  Tpbank</option>
                            <option value='OJB'>  OceanBank</option>
                            <option value='BIDV'>  BIDV Bank</option>
                            <option value='TECHCOMBANK'>  Techcombank</option>
                            <option value='VPBANK'>  VPBank</option>
                            <option value='AGRIBANK'>  AGRIBANK</option>
                            <option value='MBBANK'>  MBBank</option>
                            <option value='ACB'>  ACB</option>
                            <option value='OCB'>  OCB</option>
                            <option value='SHB'>  SHB</option>
                            <option value='IVB'>  IVB</option>
                                
                            </select></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12"><label className="labels">Language</label><select value={inputValues.language} onChange={(event) => handleOnChange(event)} name="language"  id="inputState" className="form-control">
                                
                                <option value='vn'>Tiếng Việt</option>
                                <option value='en'>English</option>
                             
                                    
                                </select></div>
                        </div>
                       
                        <div  className="mt-3"><button onClick={() => handleOnclick()} className="btn btn-primary profile-button" type="button">Pay</button></div>
                    </div>
                </div>
                            </div>

                            

                        </div>


                    </section>
                </div>
               
             
            </div>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#f5f5f5' }}></div>
        </>

    );
}

export default VnpayPaymentPage;