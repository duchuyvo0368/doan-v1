import React, { useState, useEffect } from 'react';
import { useFetchAllCode } from '../../container/customize/fetch';
import { getAllCodeService } from '../../services/userService';
function Category(props) {


    const [arrCategory, setarrCategory] = useState([])
    const [activeLinkId, setactiveLinkId] = useState('')

    useEffect(() => {
        let fetchCategory = async () => {
            let arrData = await getAllCodeService('CATEGORY')
            if (arrData && arrData.errCode === 0) {
                arrData.data.unshift({
                    createdAt: null,
                    code: 'ALL',
                    type: "CATEGORY",
                    value: "All",
                })
                setarrCategory(arrData.data)
            }
        }
        fetchCategory()
    }, [])
    let handleClickCategory = (code) => {
        props.handleRecevieDataCategory(code)
        setactiveLinkId(code)
    }

    return (

        <aside className="left_widgets p_filter_widgets">
            <div className="l_w_title">
                <h3>Categorys</h3>
            </div>
            <div className="widgets_inner">
                <ul className="list">

                    {arrCategory && arrCategory.length > 0 &&
                        arrCategory.map((item, index) => {
                            return (
                                <li className={item.code === activeLinkId ? 'active' : ''} style={{ cursor: 'pointer' }} onClick={() => handleClickCategory(item.code)} key={index}>
                                    <a>{item.value}</a>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        </aside>

    );
}

export default Category;