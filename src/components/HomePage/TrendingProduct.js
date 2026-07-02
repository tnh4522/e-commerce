import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';
import { addProductToCart } from '../utils/cartUtils';
import { getProductImageSrc, getProductName, getProductPriceLabel } from '../utils/productUtils';
import dataService from '../../services/dataService';

function TrendingProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    let navigater = useNavigate();

    useEffect(() => {
        dataService.getProducts()
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(() => setProducts([]));
    }, []);
    useEffect(() => {
        dataService.getCategories()
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]));
    }, []);
    useEffect(() => {
        const localStorageWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (localStorageWishlist) {
            setWishlist(localStorageWishlist);
        }
    }, []);

    function renderCategories() {
        return categories.map((item, index) => {
            return (
                <Link to={'/category/' + item.id} className="nav-link text-uppercase fs-6" id={'nav-' + item.category + '-tab'} data-bs-toggle="tab" data-bs-target={'#nav-' + item.category} key={index}>{item.category}</Link>
            )
        })
    };
    function renderProductsForAll() {
        const productsToDisplay = products.slice(0, 10);
        if (productsToDisplay) {
            return productsToDisplay.map((item, index) => {
                const isWishlistItem = wishlist.includes(item.id);
                return (
                    <div className="col" key={index}>
                        <div className="product-item" id={item.id}>
                            <Link to="" onClick={addToWishlist} className={`btn-wishlist ${isWishlistItem ? 'red-heart' : ''}`}><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                            <figure>
                                <Link to={'/product/detail/' + item.id} title="Product Title">
                                <img src={getProductImageSrc(item)} alt={getProductName(item)} className="tab-image" />
                                </Link>
                            </figure>
                            <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{getProductName(item)}</h3></Link>
                            <span className="qty">Reviews</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                            <span className="price">{getProductPriceLabel(item)}</span>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="input-group product-qty">
                                    <span className="input-group-btn">
                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                        </button>
                                    </span>
                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                    <span className="input-group-btn">
                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                        </button>
                                    </span>
                                </div>
                                <Link to="" onClick={addToCart} className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    };
    function renderProductsForCategory(idCategory) {
        const productsToDisplay = products.filter(val => val.idCategory === idCategory).slice(0, 10);
        return productsToDisplay.map((item, index) => {
            const isWishlistItem = wishlist.includes(item.id);
            return (
                <div className="col" key={index}>
                    <div className="product-item" id={item.id}>
                        <Link to="" onClick={addToWishlist} className={`btn-wishlist ${isWishlistItem ? 'red-heart' : ''}`}><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                        <figure>
                            <Link to={'/product/detail/' + item.id} title="Product Title">
                        <img src={getProductImageSrc(item)} alt={getProductName(item)} className="tab-image" />
                            </Link>
                        </figure>
                        <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{getProductName(item)}</h3></Link>
                        <span className="qty">Reviews</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                        <span className="price">{getProductPriceLabel(item)}</span>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="input-group product-qty">
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                        <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                    </button>
                                </span>
                                <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                        <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                    </button>
                                </span>
                            </div>
                            <Link to="" onClick={addToCart} className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                        </div>
                    </div>
                </div>
            )
        })
    };
    function renderTabPanes() {
        return categories.map((item, index) => {
            return (
                <div className="tab-pane fade" id={'nav-' + item.category} role="tabpanel" aria-labelledby={'nav-' + item.category + '-tab'} key={index}>
                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {renderProductsForCategory(item.id)}
                    </div>
                </div>
            )
        })
    };

    function addToCart(e) {
        let productId = e.target.closest('.product-item')?.id;
        if (!productId) return;
        productId = parseInt(productId);
        addProductToCart(productId, 1);
        setModalMessage('Add to cart successfully!');
        setShowModal(true);
    };
    function addToWishlist(e) {
        const getUser = localStorage.getItem('user');
        if (getUser) {
            let productId = e.target.closest('.product-item').id;
            productId = parseInt(productId);
    
            const isWishlistItem = wishlist.includes(productId);
    
            let updatedWishlist = [];
            if (isWishlistItem) {
                updatedWishlist = wishlist.filter(id => id !== productId);
            } else {

                updatedWishlist = [...wishlist, productId];
            }
    
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishlist(updatedWishlist);
    
            setModalMessage(isWishlistItem ? 'Removed from wishlist!' : 'Added to wishlist!');
            setShowModal(true);
        } else {
            alert('Please login to use this feature!');
            navigater('/login');
        }
    };
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [showModal]);
    return (
        <div>
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bootstrap-tabs product-tabs">
                                <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                                    <h3>Products</h3>
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <Link to="#" className="nav-link text-uppercase fs-6 active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all">All</Link>
                                            {renderCategories()}
                                        </div>
                                    </nav>
                                </div>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                                        <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                            {renderProductsForAll()}
                                        </div>
                                    </div>
                                    {renderTabPanes()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default TrendingProduct;