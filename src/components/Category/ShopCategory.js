import React, { useEffect, useState } from 'react';
import backgroundPattern from '../../images/background-pattern.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import Modal from '../Modal/Modal';
import { addProductToCart } from '../utils/cartUtils';
import { getProductName, getProductPrice, getCategoryName } from '../utils/productUtils';
import dataService from '../../services/dataService';
import ProductItem from '../Product/ProductItem';

function ShopCategory() {
    const [products, setProducts] = useState([]);
    const [records, setRecords] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [categoryName, setCategoryName] = useState('Danh mục');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    let navigater = useNavigate();
    let idCategory = useParams().id;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        dataService.getProducts()
            .then(data => {
                if (!isMounted) return;
                const safeProducts = Array.isArray(data) ? data : [];
                setProducts(safeProducts);
                const categoryProducts = safeProducts.filter(val => String(val.idCategory) === String(idCategory));
                setRecords(categoryProducts);
                setError('');
            })
            .catch(() => {
                if (!isMounted) return;
                setProducts([]);
                setRecords([]);
                setError('Không thể tải dữ liệu danh mục sản phẩm.');
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        dataService.getCategories()
            .then(cats => {
                if (!isMounted) return;
                const cat = (cats || []).find(c => String(c.id) === String(idCategory));
                if (cat) setCategoryName(getCategoryName(cat.category));
            })
            .catch(() => {});

        return () => { isMounted = false; };
    }, [idCategory]);

    const searchFilter = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setRecords(products.filter(val => 
            String(val.idCategory) === String(idCategory) &&
            getProductName(val).toLowerCase().includes(keyword)
        ));
    };

    function handleAddToCart(productId, quantity = 1) {
        addProductToCart(productId, quantity);
        setModalMessage(`Đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`);
        setShowModal(true);
    }

    function handleWishlistToggle(e, productId) {
        const getUser = localStorage.getItem('user');
        if (getUser) {
            const isWishlistItem = wishlist.includes(productId);
            let updatedWishlist = [];
            if (isWishlistItem) {
                updatedWishlist = wishlist.filter(id => id !== productId);
            } else {
                updatedWishlist = [...wishlist, productId];
            }

            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishlist(updatedWishlist);

            setModalMessage(isWishlistItem ? 'Đã xóa khỏi danh sách yêu thích!' : 'Đã thêm vào danh sách yêu thích!');
            setShowModal(true);
        } else {
            alert('Vui lòng đăng nhập để sử dụng tính năng này!');
            navigater('/login');
        }
    }

    function renderProducts(currentProducts) {
        if (!currentProducts || currentProducts.length === 0) return null;
        return currentProducts.map((item) => (
            <div className="col" key={item.id}>
                <ProductItem
                    item={item}
                    isWishlist={wishlist.includes(item.id)}
                    onWishlistToggle={handleWishlistToggle}
                    onAddToCart={handleAddToCart}
                />
            </div>
        ));
    }

    useEffect(() => {
        const localStorageWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (localStorageWishlist) {
            setWishlist(localStorageWishlist);
        }
    }, []);

    const handleChanges = (e) => {
        const newOrder = e.target.value;
        sorting(newOrder);
    };

    const sorting = (sortOrder) => {
        let sorted = [...records];
        if (sortOrder === 'name_a_z') {
            sorted.sort((a, b) => getProductName(a).toLowerCase().localeCompare(getProductName(b).toLowerCase()));
        } else if (sortOrder === 'name_z_a') {
            sorted.sort((a, b) => getProductName(b).toLowerCase().localeCompare(getProductName(a).toLowerCase()));
        } else if (sortOrder === 'price_low_high') {
            sorted.sort((a, b) => getProductPrice(a) - getProductPrice(b));
        } else if (sortOrder === 'price_high_low') {
            sorted.sort((a, b) => getProductPrice(b) - getProductPrice(a));
        } else {
            sorted = products.filter(val => String(val.idCategory) === String(idCategory));
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
                        <h1 className="page-title pb-2">{categoryName}</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Cửa hàng</Link>
                            <span className="breadcrumb-item active" aria-current="page">{categoryName}</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="shopify-grid">
                <div className="container-fluid">
                    <div className="row g-5">
                        <aside className="col-md-3">
                            <SideBar />
                        </aside>
                        <main className="col-md-9">
                            <div className="filter-shop d-flex justify-content-between">
                                <div className="showing-product">
                                    <p>Hiển thị {records.length} sản phẩm thuộc danh mục</p>
                                </div>
                                <div className="sort-by">
                                    <select id="input-sort" className="form-control" data-filter-sort="sortOrder" data-filter-order="desc" onChange={handleChanges}>
                                        <option value="">Thứ tự mặc định</option>
                                        <option value="name_a_z">Tên (A - Z)</option>
                                        <option value="name_z_a">Tên (Z - A)</option>
                                        <option value="price_low_high">Giá (Thấp - Cao)</option>
                                        <option value="price_high_low">Giá (Cao - Thấp)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Tìm kiếm trong danh mục này..." onChange={searchFilter} />
                            </div>
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Đang tải sản phẩm...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-warning" role="alert">{error}</div>
                            ) : records.length === 0 ? (
                                <div className="empty-state text-center py-5">
                                    <p className="lead">Chưa có sản phẩm nào trong danh mục này.</p>
                                </div>
                            ) : (
                                <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                                    {renderProducts(records)}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopCategory;
