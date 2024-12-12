import React from 'react';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
const SideBar = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading"></div>
                        <Link to="/admin" className="nav-link">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                            Home
                        </Link>

                        <div className="sb-sidenav-menu-heading">Manage</div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                    User management
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-user'} className="nav-link" >List of users</Link>
                                        <Link to={'/admin/add-user'} className="nav-link" >Add users</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-list-ol"></i></div>
                                   Category management
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-category'} className="nav-link" >Category list</Link>
                                        <Link to={'/admin/add-category'} className="nav-link" >Add categories</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="far fa-copyright"></i></div>
                                    Brand management
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBrand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-brand'} className="nav-link" >List of brands</Link>
                                        <Link to={'/admin/add-brand'} className="nav-link" >Add brand</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tshirt"></i></div>
                                    Product management
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-product'} className="nav-link" >Product list</Link>
                                        <Link to={'/admin/add-product'} className="nav-link" >Add products</Link>
                                    </nav>
                                </div>

                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBanner" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fab fa-adversal"></i></div>
                                    Quản lý băng rôn
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBanner" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-banner'} className="nav-link" >List of banners</Link>
                                        <Link to={'/admin/add-banner'} className="nav-link" >Add banners</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSubject" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fab fa-blogger"></i></div>
                                    Topic management
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseSubject" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-subject'} className="nav-link" >Topic list</Link>
                                        <Link to={'/admin/add-subject'} className="nav-link" >Add topic</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBlog" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-feather-alt"></i></div>
                                    Manage posts
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseBlog" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-blog'} className="nav-link" >List of posts</Link>
                                        <Link to={'/admin/add-blog'} className="nav-link" >Add post</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseShip" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-shipping-fast"></i></div>
                                    Manage ship types
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseShip" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typeship'} className="nav-link" >List of delivery types</Link>
                                        <Link to={'/admin/add-typeship'} className="nav-link" >Add delivery type</Link>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseVoucher" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-percentage"></i></div>
                                    Manage vouchers
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseVoucher" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/list-typevoucher'} className="nav-link" >List of promotion types</Link>
                                        <Link to={'/admin/list-voucher'} className="nav-link" >List of promotional codes</Link>
                                        <Link to={'/admin/add-typevoucher'} className="nav-link" >Add promotion type</Link>
                                        <Link to={'/admin/add-voucher'} className="nav-link" >Add promotional code</Link>
                                    </nav>
                                </div>
                            </>
                        }

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseSupplier" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-person-military-pointing"></i></div>
                            Supplier Management
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseSupplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-supplier'} className="nav-link" >Supplier list</Link>
                                <Link to={'/admin/add-supplier'} className="nav-link" >Add supplier</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReceipt" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-solid fa-file-import"></i></div>
                            Management of import goods
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseReceipt" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-receipt'} className="nav-link" >List of imported goods</Link>
                                <Link to={'/admin/add-receipt'} className="nav-link" >Add import</Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cart-plus"></i></div>
                            Order management
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseOrder" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/list-order'} className="nav-link" >List of orders</Link>

                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrder" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i class="fa-brands fa-facebook-messenger"></i></div>
                            Manage messages
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseOrder" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to={'/admin/chat'} className="nav-link" >Messenger</Link>

                            </nav>
                        </div>
                        {user && user.roleId === "R1" &&
                            <>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseStatistic" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                                    Statistical
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                                </a>

                                <div className="collapse" id="collapseStatistic" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <Link to={'/admin/turnover'} className="nav-link" >Revenue statistics</Link>

                                        <Link to={'/admin/profit'} className="nav-link" >Profit statistics</Link>
                                        <Link to={'/admin/stock-product'} className="nav-link" >Inventory statistics</Link>


                                    </nav>
                                </div>
                            </>

                        }


                    </div>
                </div >
                <div className="sb-sidenav-footer">
                   
                    Administration page
                </div>
            </nav >
        </div >
    )
}
export default SideBar;