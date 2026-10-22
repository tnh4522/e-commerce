import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import dataService from '../../services/dataService';
import { addProductToCart } from '../utils/cartUtils';
import { getProductImageSrc, getProductName, getProductPriceLabel } from '../utils/productUtils';
import Modal from '../Modal/Modal';

function RelatedProduct({ currentId, categoryId }) {
    const [related, setRelated] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dataService.getProducts()
            .then(all => {
                if (!Array.isArray(all)) return;
                let filtered = all.filter(p => String(p.id) !== String(currentId));
                if (categoryId) {
                    const sameCategory = filtered.filter(p => String(p.idCategory) === String(categoryId));
                    if (sameCategory.length >= 3) {
                        filtered = sameCategory;
                    }
                }
                setRelated(filtered.slice(0, 8));
            })
            .catch(() => setRelated([]));
    }, [currentId, categoryId]);

    const handleAddToCart = (e, productId) => {
        e.preventDefault();
        if (!productId) return;
        addProductToCart(productId, 1);
        setModalMessage('Đã thêm sản phẩm vào giỏ hàng thành công!');
        setShowModal(true);
    };

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => setShowModal(false), 1200);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    if (!related || related.length === 0) return null;

    return (
        <section id="related-products" className="product-store position-relative py-5">
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex justify-content-between mb-4">
                            <h2 className="section-title">Sản phẩm tương tự</h2>
                            <div className="d-flex align-items-center">
                                <Link to="/shop" className="btn-link text-decoration-none">Xem tất cả sản phẩm →</Link>
                                <div className="swiper-buttons ms-3">
                                    <button className="swiper-prev products-carousel-prev btn btn-yellow me-1" aria-label="Sản phẩm trước">❮</button>
                                    <button className="swiper-next products-carousel-next btn btn-yellow" aria-label="Sản phẩm tiếp">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="products-carousel swiper">
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                breakpoints={{ 1402: { slidesPerView: 5 }, 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 576: { slidesPerView: 2 }, 0: { slidesPerView: 1 } }}
                                navigation={{
                                    nextEl: '.products-carousel-next',
                                    prevEl: '.products-carousel-prev',
                                }}
                                className="swiper-wrapper"
                            >
                                {related.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="product-item">
                                            <figure>
                                                <Link to={'/product/detail/' + item.id} title={getProductName(item)}>
                                                    <img src={getProductImageSrc(item)} alt={getProductName(item)} className="tab-image" loading="lazy" />
                                                </Link>
                                            </figure>
                                            <Link to={'/product/detail/' + item.id} className="text-decoration-none">
                                                <h3>{getProductName(item)}</h3>
                                            </Link>
                                            <span className="qty">Đánh giá</span>
                                            <span className="rating ms-2">
                                                <svg width={20} height={20} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5
                                            </span>
                                            <div className="price mt-1">{getProductPriceLabel(item)}</div>
                                            <div className="d-flex align-items-center justify-content-between mt-3">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleAddToCart(e, item.id)}
                                                    className="nav-link border-0 bg-transparent"
                                                >
                                                    Thêm vào giỏ <svg width={18} height={18}><use xlinkHref="#cart" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RelatedProduct;