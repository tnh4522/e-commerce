import { Link } from 'react-router-dom';
import backgroundImageAd3 from '../../images/ad-image-3.png';
import backgroundImageAd4 from '../../images/ad-image-4.png';

function BannerCenter() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <div className="banner-ad bg-danger mb-3" style={{ background: `url(${backgroundImageAd3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}>
                            <div className="banner-content p-5">
                                <div className="categories text-primary fs-3 fw-bold">Giảm tới 25%</div>
                                <h3 className="banner-title">Sô Cô La Đen Nguyên Chất</h3>
                                <p>Hương vị cacao đậm đà, vị đắng ngọt tinh tế khó quên.</p>
                                <Link to="/shop-category/6" className="btn btn-dark text-uppercase">Mua ngay</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="banner-ad bg-info" style={{ background: `url(${backgroundImageAd4})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}>
                            <div className="banner-content p-5">
                                <div className="categories text-primary fs-3 fw-bold">Giảm tới 25%</div>
                                <h3 className="banner-title">Bánh Muffin Vani Béo Ngậy</h3>
                                <p>Bánh muffin thơm lừng nướng mới mỗi ngày, mềm xốp tan trong miệng.</p>
                                <Link to="/shop-category/2" className="btn btn-dark text-uppercase">Mua ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default BannerCenter;