import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';
import { addProductToCart } from '../utils/cartUtils';
import dataService from '../../services/dataService';
import ProductItem from '../Product/ProductItem';
import { getCategoryName } from '../utils/productUtils';

function TrendingProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    const navigater = useNavigate();

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

    function renderCategories() {
        return categories.map((item, index) => {
            const tabId = 'nav-cat-' + item.id;
            return (
                <button
                    type="button"
                    className="nav-link text-uppercase fs-6 border-0 bg-transparent"
                    id={tabId + '-tab'}
                    data-bs-toggle="tab"
                    data-bs-target={'#' + tabId}
                    role="tab"
                    aria-controls={tabId}
                    aria-selected="false"
                    key={index}
                >
                    {getCategoryName(item.category)}
                </button>
            );
        });
    }

    function renderProductsForAll() {
        const productsToDisplay = products.slice(0, 10);
        return productsToDisplay.map((item) => (
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

    function renderProductsForCategory(idCategory) {
        const productsToDisplay = products.filter(val => val.idCategory === idCategory).slice(0, 10);
        return productsToDisplay.map((item) => (
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

    function renderTabPanes() {
        return categories.map((item, index) => {
            const tabId = 'nav-cat-' + item.id;
            return (
                <div className="tab-pane fade" id={tabId} role="tabpanel" aria-labelledby={tabId + '-tab'} key={index}>
                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {renderProductsForCategory(item.id)}
                    </div>
                </div>
            );
        });
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
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bootstrap-tabs product-tabs">
                                <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                                    <h3>Sản phẩm nổi bật</h3>
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button className="nav-link text-uppercase fs-6 active border-0 bg-transparent" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">Tất cả</button>
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
    );
}

export default TrendingProduct;