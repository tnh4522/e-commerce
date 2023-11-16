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
                            <h2 className="section-title">Category</h2>
                            <div className="d-flex align-items-center">
                                <Link to="/shop" className="btn-link text-decoration-none">View All Categories →</Link>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev category-carousel-prev btn btn-yellow">❮</button>
                                    <button className="swiper-next category-carousel-next btn btn-yellow">❯</button>
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
                                    // autoplay={{delay: 2000 }}
                                    loop={true}
                                    className="swiper-wrapper"
                                >
                                    <SwiperSlide>
                                        <Link to="/shop-category/1" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-vegetables-broccoli.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Vegetables</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/2" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-bread-baguette.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Breads</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/3" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-soft-drinks-bottle.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Fruit Juices</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/4" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-wine-glass-bottle.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Beverages</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/5" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-animal-products-drumsticks.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Meat Products</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/6" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/cupcake.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Sweets</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/7" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/basket.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Fruits</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/2" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-bread-baguette.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Breads</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/3" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-soft-drinks-bottle.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Fruit Juices</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/4" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-wine-glass-bottle.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Beverages</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/5" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/icon-animal-products-drumsticks.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Meat Products</h3>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Link to="/shop-category/6" className="nav-link category-item swiper-slide">
                                            <img src={require('../../images/cupcake.png')} alt="Category Thumbnail" />
                                            <h3 className="category-title">Sweets</h3>
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