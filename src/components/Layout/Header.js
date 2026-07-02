import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import dataService from '../../services/dataService';
import { getCartTotalItems, safeParseJSON } from '../utils/cartUtils';
import { getProductImageSrc, getProductName } from '../utils/productUtils';

function Header() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('wishlist');
        navigate('/');
    };
    function checkAuthenticate() {
        let user = safeParseJSON(localStorage.getItem('user'));
        if (user) {
            return user.level
        }
    }
    const [cartCount, setCartCount] = useState(() => {
        return getCartTotalItems();
    });
    const blurTimeout = useRef(null);

    useEffect(() => {
        const handleCartUpdate = (e) => {
            if (e.detail && e.detail.totalItems !== undefined) {
                setCartCount(e.detail.totalItems);
            }
        };
        const handleStorageChange = (e) => {
            if (e.key === 'cartTotalItem') {
                setCartCount(parseInt(e.newValue) || 0);
            }
        };
        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    function renderLogin() {
        let user = safeParseJSON(localStorage.getItem('user'));
        if (user) {
            return (
                <ul className="d-flex justify-content-end list-unstyled m-0" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <li className="dropdown" style={{ display: 'flex', alignItems: 'center' }}>
                        <span>Welcome, {user.name}</span>
                        <button type="button" className="p-2 mx-2 dropdown-toggle border-0 bg-transparent" id="user" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Open user menu">
                            <svg width={24} height={24} viewBox="0 0 24 24"><use xlinkHref="#user" /></svg>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="user">
                            <li><Link to="/account" className="dropdown-item">My Account</Link></li>
                            <li><Link to="/wish-list" className="dropdown-item">Wishlist</Link></li>
                            <li><Link to="/cart" className="dropdown-item">Cart</Link></li>
                            <li><Link to="/order" className="dropdown-item">Orders</Link></li>
                            <li><Link to="/login" className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/cart" className="rounded-circle position-relative p-2 mx-2">
                            <svg width={30} height={30} viewBox="0 0 24 24"><use xlinkHref="#cart" /></svg>
                            <div className="cart-total-item badge position-absolute top-0 start-5 bg-primary rounded-pill">{cartCount}</div>
                        </Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="d-flex justify-content-end list-unstyled m-0">
                    <li>
                        <Link to="/login" className="rounded-circle p-2 mx-1">
                            <svg width={24} height={24} viewBox="0 0 24 24"><use xlinkHref="#user" /></svg>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="rounded-circle p-2 mx-2">
                            <svg width={30} height={30} viewBox="0 0 24 24"><use xlinkHref="#cart" /></svg>
                            <div className="cart-total-item badge position-absolute top-5 start-5 bg-primary rounded-pill">{cartCount}</div>
                        </Link>
                    </li>
                </ul >
            )
        }
    }
    const [product, setProduct] = useState([]);
    const [record, setRecord] = useState([]);

    useEffect(() => {
        dataService.getProducts()
            .then(data => { setProduct(Array.isArray(data) ? data : []); })
            .catch(() => { setProduct([]); });
    }, []);

    const searchFilter = (e) => {
        let input = e.target.value.trim().toLowerCase();
        if (input === '') {
            setRecord([]);
        } else {
            setRecord(product.filter(val => getProductName(val).toLowerCase().includes(input)).slice(0, 8));
        }
    }

    const handleBlur = () => {
        blurTimeout.current = setTimeout(() => {
            setRecord([]);
        }, 200);
    }

    const renderData = () => {
        if (record.length > 0) {
            return record.map((val, index) => {
                return (
                    <li key={val.id || index} className="border-bottom" onMouseDown={() => clearTimeout(blurTimeout.current)}>
                        <Link to={`/product/detail/${val.id}`} className="d-flex align-items-center text-decoration-none gap-3 py-2 px-3">
                            <img src={getProductImageSrc(val)} alt={getProductName(val)} className="img-fluid" width={50} />
                            <div className="product-name">{getProductName(val)}</div>
                        </Link>
                    </li>
                )
            })
        }
    }

    return (
        <div>
            <div>
                {/* <div className="preloader-wrapper">
                    <div className="preloader">
                    </div>
                </div> */}
                <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasSearch">
                    <div className="offcanvas-header justify-content-center">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body">
                        <div className="order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Search</span>
                            </h4>
                            <form role="search" className="d-flex mt-3 gap-0" onSubmit={(e) => e.preventDefault()}>
                                <input className="form-control rounded-start rounded-0 bg-light" type="text" placeholder="What are you looking for?" aria-label="What are you looking for?" />
                                <button className="btn btn-dark rounded-end rounded-0" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <header>
                <div className="container-fluid">
                    <div className="row py-3 border-bottom">
                        <div className="col-sm-4 col-lg-3 text-center text-sm-start">
                            <div className="main-logo">
                                <Link to="/">
                                    <img src={require('../../images/logo.png')} alt="logo" className="img-fluid" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
                            <div className="search-bar row bg-light p-2 my-2 rounded-4">
                                <div className="col-11 col-md-11">
                                    <form id="search-form" className="text-center" onSubmit={(e) => e.preventDefault()}>
                                        <input type="text" className="form-control border-0 bg-transparent" placeholder="Search for more than 20,000 products" onChange={searchFilter} onBlur={handleBlur} />
                                        <div className="col-sm-4 search-results position-absolute bg-light z-3">
                                            <ul className="list-unstyled m-0 p-0">
                                                {renderData()}
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-1">
                                    <button type="button" className="rounded-circle bg-light p-2 mx-1 border-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch" aria-label="Open search">
                                        <svg width={24} height={24} viewBox="0 0 24 24"><use xlinkHref="#search" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
                            {renderLogin()}
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row py-3">
                        <div className="d-flex  justify-content-center justify-content-sm-between align-items-center">
                            <nav className="main-menu d-flex navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                    <div className="offcanvas-header justify-content-center">
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                                    </div>
                                    <div className="offcanvas-body">
                                        <select className="filter-categories border-0 mb-0 me-5">
                                            <option>Shop by Departments</option>
                                            <option>Groceries</option>
                                            <option>Drinks</option>
                                            <option>Chocolates</option>
                                        </select>
                                        <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                                            <li className="nav-item active">
                                                <Link to="/" className="nav-link">Home</Link>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <Link to="/shop" className="nav-link">Shop</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/blog" className="nav-link">Blog</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/gemini-modal" className="nav-link">Recipe</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/contact" className="nav-link">Contact </Link>
                                            </li>
                                            {/* <li className="nav-item dropdown">
                                                <Link to="" className="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">Pages</Link>
                                                <ul className="dropdown-menu" aria-labelledby="pages">
                                                    <li><Link to="/about" className="dropdown-item">About Us <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/shop" className="dropdown-item">Shop <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/single-product" className="dropdown-item">Single Product <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/cart" className="dropdown-item">Cart <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/checkout" className="dropdown-item">Checkout <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/blog" className="dropdown-item">Blog <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/single-blog" className="dropdown-item">Single Post <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="" className="dropdown-item">Styles <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/contact" className="dropdown-item">Contact <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/thank-you" className="dropdown-item">Thank You <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="/login" className="dropdown-item">My Account <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                    <li><Link to="" className="dropdown-item">404 Error <span className="badge bg-success text-dark ms-2">PRO</span></Link></li>
                                                </ul>
                                            </li> */}
                                            {checkAuthenticate() === 1 ?
                                                <li className="nav-item dropdown">
                                                    <Link to="/admin" className="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">Admin</Link>
                                                    <ul className="dropdown-menu" aria-labelledby="pages">
                                                        <li><Link to="/admin" className="dropdown-item">Manage Users</Link></li>
                                                        <li><Link to="/admin/manage-blog" className="dropdown-item">Manage Blogs</Link></li>
                                                        <li><Link to="/admin/add-blog" className="dropdown-item">Add Blog</Link></li>
                                                    </ul>
                                                </li> : ''}
                                            {checkAuthenticate() === 2 ?
                                                <li className="nav-item dropdown">
                                                    <Link to="/seller" className="nav-link dropdown-toggle" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">Seller</Link>
                                                    <ul className="dropdown-menu" aria-labelledby="pages">
                                                        <li><Link to="/seller" className="dropdown-item">Manage Products</Link></li>
                                                        <li><Link to="/seller/manage-order" className="dropdown-item">Manage Orders</Link></li>
                                                        <li><Link to="/seller/add-product" className="dropdown-item">Add Product</Link></li>
                                                    </ul>
                                                </li> : ''
                                            }
                                            <li className="nav-item">
                                                <Link to="/about" className="nav-link">Info</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default Header;
