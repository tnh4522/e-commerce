import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import backgroundPattern from '../../images/background-pattern.jpg';
import Modal from "../Modal/Modal";
import dataService from '../../services/dataService';
import { getProductImageSrc, getProductName, getProductPriceLabel } from '../utils/productUtils';
import { addProductToCart } from '../utils/cartUtils';

function Wishlist() {
    const [getData, setData] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        dataService.getProducts()
            .then(data => setData(Array.isArray(data) ? data : []))
            .catch(() => setData([]));
    }, []);

    function renderWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (getData && wishlist && wishlist.length > 0) {
            var productWishList = getData.filter((item) => {
                return wishlist.includes(item.id);
            });
            if (productWishList.length === 0) {
                return (
                    <div className="col-12 py-5 text-center">
                        <h3 className="text-muted">Danh sách yêu thích đang trống</h3>
                        <Link to="/shop" className="btn btn-primary mt-3">Khám phá sản phẩm ngay</Link>
                    </div>
                );
            }
            return productWishList.map((item, index) => {
                return (
                    <div className="col" key={index}>
                        <div className="product-item" id={item.id}>
                            <figure>
                                <Link to={'/product/detail/' + item.id} title={getProductName(item)}>
                                    <img alt={getProductName(item)} src={getProductImageSrc(item)} className="tab-image" />
                                </Link>
                            </figure>
                            <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{getProductName(item)}</h3></Link>
                            <span className="qty">Đánh giá</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                            <span className="price">{getProductPriceLabel(item)}</span>
                            <div className="d-flex align-items-center justify-content-between">
                                <button type="button" className="btn btn-outline-danger btn-sm" id={item.id} onClick={deleteWishList}>Xóa</button>
                                <button type="button" className="nav-link border-0 bg-transparent" onClick={addToCart}>Thêm vào giỏ <svg width={24} height={24}><use xlinkHref="#cart" /></svg></button>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-12 py-5 text-center">
                    <h3 className="text-muted">Danh sách yêu thích đang trống</h3>
                    <p className="text-muted">Hãy thêm những món ăn yêu thích vào danh sách để xem lại bất cứ lúc nào!</p>
                    <Link to="/shop" className="btn btn-primary mt-3">Khám phá sản phẩm ngay</Link>
                </div>
            )
        }
    }
    function addToCart(e) {
        let productId = e.target.closest('.product-item').id;
        productId = parseInt(productId);
        addProductToCart(productId, 1);
        setModalMessage('Đã thêm sản phẩm vào giỏ hàng thành công!');
        setShowModal(true);
    }

    function deleteWishList(e) {
        let product_id = e.target.id;
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let index = wishlist.indexOf(parseInt(product_id));
        if (index > -1) {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setData([...getData]);
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
        <div className="col-sm-12 padding-right">
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <div className="features_items">
                <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between">
                            <h1 className="page-title pb-2">Danh sách yêu thích</h1>
                            <nav className="breadcrumb fs-6">
                                <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                                <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                                <span className="breadcrumb-item active" aria-current="page">Yêu thích</span>
                            </nav>
                        </div>
                    </div>
                </section>
                <div className="container-fluid">
                    <div className="product-grid row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                        {renderWishlist()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wishlist;