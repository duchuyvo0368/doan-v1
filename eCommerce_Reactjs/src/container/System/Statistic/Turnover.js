import React from 'react';
import { useEffect, useState } from 'react';
import { getStatisticOverturn } from '../../../services/userService';
// import DatePicker from '../../../component/input/DatePicker';
import { toast } from 'react-toastify';
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import CommonUtils from '../../../utils/CommonUtils';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const Turnover = (props) => {
    const [dataOrder, setdataOrder] = useState([])
    const [dataExport, setdataExport] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [type, settype] = useState('day')
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [DateTime, setDateTime] = useState(new Date());



    let handleOnclick = async () => {

        let res = await getStatisticOverturn({
            oneDate: type == 'day' ? startDate : DateTime,
            twoDate: endDate,
            type: type
        })
        if (res && res.errCode == 0) {
            let total = 0;
            for (let i = 0; i < res.data.length; i++) {
                total = total + res.data[i].totalpriceProduct

            }
            settotalPrice(total)
            setdataOrder(res.data)
            let arrayObject = []
            res.data.forEach(item => {
                arrayObject.push({
                    id: item.id,
                    createdAt: moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss'),
                    updatedAt: moment.utc(item.updatedAt).local().format('DD/MM/YYYY HH:mm:ss'),
                    typeShip: item.typeShipData.type,
                    codeVoucher: item.voucherData.codeVoucher,
                    paymentType: item.isPaymentOnline == 0 ? 'Thanh toán tiền mặt' : 'Thanh toán online',
                    statusOrder: item.statusOrderData.value,
                    totalpriceProduct: item.totalpriceProduct,

                })
            });
            setdataExport(arrayObject)
        }
    }
    let handleOnClickExport = async () => {

        await CommonUtils.exportExcel(dataExport, "Thống kê doanh thu", "TurnOver")
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Statistical</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Thống kê doanh thu
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Statistics type</label>
                                <select value={type} name="type" onChange={(event) => settype(event.target.value)} id="inputState" className="form-control">
                                    <option value="day">Day</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            {type == "day" &&
                                <>

                                    <div className="form-group col-md-2">
                                        <DatePicker
                                            showMonthDropdown
                                            showYearDropdown
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                setDateRange(update);
                                            }}
                                            className="form-control"
                                            isClearable={true}
                                        />
                                    </div>


                                </>
                            }
                            {type == "month" &&
                                <>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputCity">Select month</label>
                                        <DatePicker
                                            selected={DateTime}
                                            onChange={(date) => setDateTime(date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            className='form-control'
                                        />
                                    </div>
                                </>
                            }
                            {type == "year" &&
                                <>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="inputCity">Select year</label>
                                        <DatePicker
                                            selected={DateTime}
                                            onChange={(date) => setDateTime(date)}
                                            dateFormat="yyyy"
                                            showYearPicker
                                            className='form-control'
                                        />
                                    </div>
                                </>
                            }


                        </div>
                        <button type="button" onClick={() => handleOnclick()} className="btn btn-primary">Filter</button>
                    </form>
                </div>
                <div className="card-body">
                    <div className='row'>

                        <div className='col-12 mb-2'>
                            <button style={{ float: 'right' }} onClick={() => handleOnClickExport()} className="btn btn-success" >Export excel <i class="fa-solid fa-file-excel"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Single code</th>
                                    <th>Booking date</th>
                                    <th>Update date</th>
                                    <th>Type of ship</th>
                                    <th>Voucher code</th>
                                    <th>Form</th>
                                    <th>Status</th>
                                    <th>Total amount</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataOrder && dataOrder.length > 0 &&
                                    dataOrder.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{moment.utc(item.createdAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{moment.utc(item.updatedAt).local().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>{item.typeShipData.type}</td>
                                                <td>{item.voucherData.codeVoucher}</td>
                                                <td>{item.isPaymentOnline == 0 ? 'Thanh toán tiền mặt' : 'Thanh toán online'}</td>
                                                <td>{item.statusOrderData.value}</td>
                                                <td>{CommonUtils.formatter.format(item.totalpriceProduct)}</td>
                                                <td>
                                                    <Link to={`/admin/order-detail/${item.id}`}>Xem chi tiết</Link>


                                                </td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>

                    </div>
                    <span style={{ fontSize: '26px' }} className="text-total">Total revenue:  </span>
                    <span style={{ color: '#71cd14', fontSize: '26px' }} className="text-price">{CommonUtils.formatter.format(totalPrice)}</span>
                </div>
            </div>
        </div>
    )
}
export default Turnover;