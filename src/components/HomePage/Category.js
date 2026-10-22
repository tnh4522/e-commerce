import { Link } from 'react-router-dom';
import { Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function Category() {
    return (
        <section className="py-5 overflow-hidden">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between mb-5">
                            <h2 className="section-title">Danh mục sản phẩm</h2>
                            <div className="d-flex align-items-center">
                                <Link to="/shop" className="btn-link text-decoration-none">Xem tất cả danh mục →</Link>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev category-carousel-prev btn btn-yellow" aria-label="Danh mục trước">❮</button>
                                    <button className="swiper-next category-carousel-next btn btn-yellow" aria-label="Danh mục tiếp">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="category-carousel swiper">
                            <div className="swiper-wrapper">
                                <Swiper modules={[Navigation, Mousewheel, Autoplay]}
                                    spaceBetween={30}
                                    breakpoints={{ 1402: { slidesPerView: 6 }, 1342: { slidesPerView: 5 }, 1208: { slidesPerView: 4 }, 780: { slidesPerView: 3 }, 576: { slidesPerView: 2 }, 0: { slidesPerView: 1 } }}
                                    navigation={{
                                        nextEl: '.category-carousel-next',
                                        prevEl: '.category-carousel-prev',
                                    }}
                                    mousewheel={true}
                                    loop={true}
                                    className="swiper-wrapper"
                                >
                                    <SwiperSlide>
                                        <Link to="/shop-category/1" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-vegetables-broccoli.png')} alt="Rau củ hữu cơ" />
                                            <h3 className="category-title">Rau củ hữu cơ</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/2" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-bread-baguette.png')} alt="Bánh mì tươi" />
                                            <h3 className="category-title">Bánh mì tươi</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/3" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-soft-drinks-bottle.png')} alt="Nước ép trái cây" />
                                            <h3 className="category-title">Nước ép trái cây</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/4" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-wine-glass-bottle.png')} alt="Đồ uống & Sữa" />
                                            <h3 className="category-title">Đồ uống &amp; Sữa</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/5" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-animal-products-drumsticks.png')} alt="Thịt & Hải sản" />
                                            <h3 className="category-title">Thịt &amp; Hải sản</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/6" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/cupcake.png')} alt="Đồ ngọt & Mật ong" />
                                            <h3 className="category-title">Đồ ngọt &amp; Mật ong</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/7" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/basket.png')} alt="Trái cây tươi" />
                                            <h3 className="category-title">Trái cây tươi</h3>
                                        </Link>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Category;