import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import backgroundPattern from '../../images/background-pattern.jpg';
import SideBar from "./SideBar";
import ShopPagination from "../shop/ShopPagination";
import Modal from "../Modal/Modal";
import dataService from '../../services/dataService';
import { addProductToCart, safeParseJSON } from "../utils/cartUtils";
import { getProductImageSrc, getProductName, getProductPrice, getProductPriceLabel } from "../utils/productUtils";

function ShopCategory() {
    let idCategory = useParams().id;
    const [products, setProducts] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const navigater = useNavigate();
    useEffect(() => {
        setLoading(true);
        dataService.getProducts()
            .then(data => {
                const all = Array.isArray(data) ? data : [];
                const filtered = all.filter(val => String(val.idCategory) === String(idCategory));
                setProducts(filtered);
                setRecords(filtered);
                setError('');
            })
            .catch(() => {
                setError('We could not load this category right now. Please try again later.');
            })
            .finally(() => setLoading(false));
        const localStorageWishlist = safeParseJSON(localStorage.getItem('wishlist'), []);
        if (Array.isArray(localStorageWishlist)) {
            setWishlist(localStorageWishlist);
        }
    }, [idCategory]);
    const searchFilter = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setRecords(products.filter(val => getProductName(val).toLowerCase().includes(keyword)));
    }
    function renderProducts(currentProducts) {
        return currentProducts.map((item) => {
            const isWishlistItem = wishlist.includes(item.id);
            return (
                <div className="col" key={item.id}>
                    <div className="product-item" id={item.id}>
                        <button type="button" onClick={addToWishlist} className={`btn-wishlist border-0 ${isWishlistItem ? 'red-heart' : ''}`} aria-label={isWishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}><svg width={24} height={24}><use xlinkHref="#heart" /></svg></button>
                        <figure>
                            <Link to={'/product/detail/' + item.id} title="Product Title">
                                <img alt={getProductName(item)} src={getProductImageSrc(item)} className="tab-image" loading="lazy" />
                            </Link>
                        </figure>
                        <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{getProductName(item)}</h3></Link>
                        <span className="qty">Đánh giá</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                        <span className="price">{getProductPriceLabel(item)}</span>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="input-group product-qty">
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-left-minus btn btn-danger btn-number" disabled aria-label="Decrease quantity">
                                        <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                    </button>
                                </span>
                                <input type="text" name="quantity" className="form-control input-number" value={1} readOnly aria-label="Quantity" />
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-right-plus btn btn-success btn-number" disabled aria-label="Increase quantity">
                                        <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                    </button>
                                </span>
                            </div>
                            <button type="button" className="nav-link border-0 bg-transparent" onClick={addToCart} disabled={getProductPrice(item) < 0}>Add to Cart <svg width={24} height={24}><use xlinkHref="#cart" /></svg></button>
                        </div>
                    </div>
                </div>
            )
        })
    }
    function addToCart(e) {
        let productId = e.target.closest('.product-item').id;
        productId = parseInt(productId);
        addProductToCart(productId, 1);
        setModalMessage('Add to cart successfully!');
        setShowModal(true);
    }

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
    
    const handleChanges = (e) => {
        sorting(e.target.value);
    }
    const sorting = (sortOrder) => {
        let sorted;
        if (sortOrder === 'name_a_z') {
            sorted = [...records].sort((a, b) => getProductName(a).toLowerCase().localeCompare(getProductName(b).toLowerCase()));
        } else if (sortOrder === 'name_z_a') {
            sorted = [...records].sort((a, b) => getProductName(b).toLowerCase().localeCompare(getProductName(a).toLowerCase()));
        } else if (sortOrder === 'price_low_high') {
            sorted = [...records].sort((a, b) => getProductPrice(a) - getProductPrice(b));
        } else if (sortOrder === 'price_high_low') {
            sorted = [...records].sort((a, b) => getProductPrice(b) - getProductPrice(a));
        } else {
            sorted = [...products];
        }
        setRecords(sorted);
    }
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
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Shop</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Shop</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="shopify-grid">
                <div className="container-fluid">
                    <div className="row g-5">
                        <aside className="col-md-2">
                            <SideBar searchFilter={searchFilter} />
                        </aside>
                        <main className="col-md-10">
                            <div className="filter-shop d-flex justify-content-between">
                                <div className="showing-product">
                                    <p>Showing <span className="text-primary">{records.length}</span> of {products.length} results</p>
                                </div>
                                <div className="sort-by">
                                    <select id="input-sort" name="sort" className="form-control" data-filter-sort data-filter-order onChange={handleChanges}>
                                        <option value="">Default sorting</option>
                                        <option value="name_a_z">Name (A - Z)</option>
                                        <option value="name_z_a">Name (Z - A)</option>
                                        <option value="price_low_high">Price (Low-High)</option>
                                        <option value="price_high_low">Price (High-Low)</option>
                                    </select>
                                </div>
                            </div>
                            {/* / product-grid */}
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading products...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger" role="alert">{error}</div>
                            ) : records.length === 0 ? (
                                <div className="empty-state text-center py-5">
                                    <h3>No products found in this category</h3>
                                    <p className="text-muted">Try another search term or go back to the full shop.</p>
                                    <Link to="/shop" className="btn btn-primary">View all products</Link>
                                </div>
                            ) : (
                                <ShopPagination products={records} renderProducts={renderProducts} />
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShopCategory;
