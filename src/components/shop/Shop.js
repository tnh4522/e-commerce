import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundPattern from '../../images/background-pattern.jpg';
import SideBar from "../Category/SideBar";
import ShopPagination from "./ShopPagination";
import Modal from "../Modal/Modal";
import API from "../API/API";
import { addProductToCart, safeParseJSON } from '../utils/cartUtils';
import { getProductImageSrc, getProductName, getProductPrice, getProductPriceLabel } from '../utils/productUtils';
function Shop(props) {
    const [products, setProducts] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const navigater = useNavigate();
    useEffect(() => {
        API.get('product/list')
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setProducts(list);
                setRecords(list);
                setError('');
            })
            .catch(() => {
                setError('We could not load products right now. Please try again later.');
            })
            .finally(() => setLoading(false));
        const localStorageWishlist = safeParseJSON(localStorage.getItem('wishlist'), []);
        if (Array.isArray(localStorageWishlist)) {
            setWishlist(localStorageWishlist);
        }
    }, []);
    const searchFilter = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setRecords(products.filter(val => getProductName(val).toLowerCase().includes(keyword)));
    }
    function renderProducts(products) {
        let currentProducts = products;
        if (currentProducts) {
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
                            <span className="qty">Reviews</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                            <span className="price">{getProductPriceLabel(item)}</span>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="input-group product-qty" aria-label="Default quantity is 1">
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
        const newOrder = e.target.value;
        sorting(newOrder);
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
                                        <option value="price_low_high">Price (Low - High)</option>
                                        <option value="price_high_low">Price (High - Low)</option>
                                    </select>
                                </div>
                            </div>
                            {/* / product-grid */}
                            {/* <nav className="navigation paging-navigation text-center py-4" role="navigation">
                                <div className="pagination loop-pagination d-flex justify-content-center align-items-center"></div>
                                    <Link to="#">
                                        <svg className="chevron-left pe-3">
                                            <use xlinkHref="#chevron-left" />
                                        </svg>
                                    </Link>
                                    <span aria-current="page" className="page-numbers current pe-3">1</span>
                                    <Link className="page-numbers pe-3" to="#">2</Link>
                                    <Link className="page-numbers pe-3" to="#">3</Link>
                                    <Link className="page-numbers pe-3" to="#">4</Link>
                                    <Link className="page-numbers" to="#">5</Link>
                                    <Link to="#">
                                        <svg className="chevron-right ps-3">
                                            <use xlinkHref="#chevron-right" />
                                        </svg>
                                    </Link>
                                </div>
                            </nav> */}
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
                                    <h3>No products found</h3>
                                    <p className="text-muted">Try another search term or browse all categories.</p>
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
export default Shop;
