import { Link } from "react-router-dom";
import backgroundPattern from '../../images/background-pattern.jpg';

function About() {
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Về chúng tôi</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Cửa hàng</Link>
                            <span className="breadcrumb-item active" aria-current="page">Giới thiệu</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="company-detail py-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <blockquote>
                                "FoodMart cam kết mang nguồn thực phẩm hữu cơ tươi ngon, an toàn và bổ dưỡng nhất từ các nông trại chuẩn xanh đến bữa cơm gia đình bạn mỗi ngày."
                            </blockquote>
                            <p>
                                <strong>Khởi nguồn từ tình yêu với thiên nhiên và nông nghiệp sạch:</strong> Được thành lập với sứ mệnh kết nối người tiêu dùng với các trang trại nông sản đạt chuẩn VietGAP, GlobalGAP và chuẩn Organic quốc tế, FoodMart tự hào là điểm đến tin cậy của hàng nghìn gia đình yêu thích lối sống lành mạnh.
                            </p>
                            <p>
                                Mọi sản phẩm rau củ, trái cây tươi, thịt hải sản, sữa và các loại hạt dinh dưỡng tại FoodMart đều trải qua quy trình kiểm soát chất lượng nghiêm ngặt: từ khâu canh tác tự nhiên không phân bón hóa học, thu hoạch trong ngày, đóng gói cẩn thận cho đến vận chuyển nhanh chóng bảo toàn độ tươi mới tối đa.
                            </p>
                        </div>
                    </div>
                    <h2 className="mt-5 mb-4">Giá Trị Cốt Lõi Của FoodMart</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                <h4 className="text-primary mb-3">100% Nguồn Gốc Tự Nhiên</h4>
                                <p className="text-muted">
                                    Chúng tôi cam kết 100% thực phẩm tươi sống có nguồn gốc xuất xứ rõ ràng, thu hoạch tươi mới mỗi ngày và hoàn toàn không dùng chất bảo quản nhân tạo.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                <h4 className="text-primary mb-3">Chất Lượng Thượng Hạng</h4>
                                <p className="text-muted">
                                    Hợp tác cùng các thương hiệu uy tín như Organic Valley, Amber Jar, Sunstar, Heinz nhằm mang đến cho bạn những sản phẩm sạch và thơm ngon nhất.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                <h4 className="text-primary mb-3">Tận Tâm Phục Vụ</h4>
                                <p className="text-muted">
                                    Dịch vụ giao hàng nhanh trong ngày, đổi trả linh hoạt nếu không hài lòng và hỗ trợ khách hàng chu đáo 24/7 để bạn an tâm mua sắm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;