import { Link } from "react-router-dom";
import RecentBlog from "../HomePage/RecentBlog";

function SingleBlog() {
    function handleSubmitComment(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã gửi bình luận! Đóng góp của bạn sẽ được hiển thị sau khi duyệt.');
        e.target.reset();
    }

    return (
        <div>
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="mt-4">
                        <div className="post-meta mb-2">
                            <span className="badge bg-success me-2">Cẩm nang ẩm thực</span>
                            <span className="text-muted small">Cập nhật: 20 Tháng 10, 2026</span>
                        </div>
                        <h1 className="page-title fw-bold text-dark">
                            Bí Quyết Chọn Mua Nông Sản Sạch Và Cách Bảo Quản Rau Củ Luôn Tươi Giòn
                        </h1>
                    </div>
                </div>
            </section>

            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <main className="col-lg-10 post-grid">
                            <article className="post-item">
                                <div className="post-content">
                                    <div className="post-thumbnail mb-4 text-center">
                                        <img
                                            src={require('../../images/banner-image-1.jpg')}
                                            alt="Nông sản sạch FoodMart"
                                            className="img-fluid rounded-4 shadow-sm w-100"
                                            style={{ maxHeight: '480px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="post-description py-3 line-height-lg text-secondary">
                                        <p className="lead fw-semibold text-dark">
                                            Lựa chọn thực phẩm tươi ngon, an toàn cho bữa ăn gia đình là ưu tiên hàng đầu của mọi người nội trợ hiện đại. Nông sản hữu cơ không chỉ cung cấp nguồn vitamin, khoáng chất dồi dào mà còn giúp bảo vệ hệ tiêu hóa và tăng cường hệ miễn dịch tự nhiên.
                                        </p>
                                        <p>
                                            Trong nhịp sống bận rộn, việc đi chợ hoặc mua sắm trực tuyến cần có những mẹo nhỏ để nhận biết rau củ đạt chuẩn chất lượng VietGAP, GlobalGAP. Hãy cùng FoodMart khám phá những tiêu chí chuẩn mực khi chọn mua và bảo quản rau củ quả tươi sống nhé!
                                        </p>
                                        <blockquote className="p-4 bg-light rounded-3 border-start border-4 border-success fst-italic text-dark my-4">
                                            “Sức khỏe bắt đầu từ nguồn nguyên liệu sạch. Một bữa cơm trọn vị là sự kết tinh của tình yêu thương và sự chọn lọc khắt khe từng cọng rau, quả cà chua đạt chuẩn hữu cơ.”
                                        </blockquote>

                                        <h3 className="fw-bold text-dark mt-4 mb-3">1. Nguyên tắc vàng khi chọn mua rau củ quả</h3>
                                        <ul className="list-unstyled ps-3">
                                            <li className="mb-2 d-flex align-items-start">
                                                <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                                <span><strong>Màu sắc tự nhiên:</strong> Ưu tiên chọn rau củ có màu sắc tươi sáng nhưng tự nhiên, không bóng loáng bất thường hoặc có kích thước phổng phao quá mức.</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-start">
                                                <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                                <span><strong>Độ tươi nguyên của cuống:</strong> Cuống hoa quả phải còn tươi xanh, dính chắc vào thân quả; tránh những loại cuống đã thâm đen hoặc có dấu hiệu dập nát.</span>
                                            </li>
                                            <li className="mb-2 d-flex align-items-start">
                                                <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                                <span><strong>Mùi hương tự nhiên:</strong> Rau củ sạch luôn giữ được mùi thơm thanh mát đặc trưng, không có mùi lạ hay hóa chất bảo quản.</span>
                                            </li>
                                        </ul>

                                        <div className="my-4 text-center">
                                            <img
                                                src={require('../../images/banner-image-2.jpg')}
                                                className="img-fluid rounded-4 shadow-sm w-100"
                                                alt="Bảo quản rau củ đúng cách"
                                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                                            />
                                        </div>

                                        <h3 className="fw-bold text-dark mt-4 mb-3">2. Phương pháp bảo quản để giữ trọn dưỡng chất</h3>
                                        <p>
                                            Nhiều người có thói quen rửa sạch rau củ ngay khi mua về rồi cất tủ lạnh, tuy nhiên điều này có thể làm rau dễ bị ủng nước. Thay vào đó, bạn nên nhặt bỏ các lá úa, để rau ráo nước hoàn toàn và bọc trong giấy báo sạch hoặc túi hút chân không chuyên dụng trước khi bảo quản ở ngăn mát từ 4 - 8°C.
                                        </p>
                                        <p>
                                            Đối với các loại củ quả như khoai tây, hành tây, tỏi nên bảo quản ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp để không làm suy giảm chất lượng và nảy mầm gây hại.
                                        </p>

                                        <div className="post-tags mt-4 pt-3 border-top">
                                            <div className="d-flex flex-wrap align-items-center gap-2">
                                                <span className="fw-bold text-dark me-2">Từ khóa:</span>
                                                <Link to="/blog" className="badge bg-light text-dark border text-decoration-none py-2 px-3">Mẹo nhà bếp</Link>
                                                <Link to="/blog" className="badge bg-light text-dark border text-decoration-none py-2 px-3">Rau hữu cơ</Link>
                                                <Link to="/blog" className="badge bg-light text-dark border text-decoration-none py-2 px-3">Sống khỏe</Link>
                                                <Link to="/blog" className="badge bg-light text-dark border text-decoration-none py-2 px-3">FoodMart</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="single-post-navigation" className="my-5 p-4 bg-light rounded-4">
                                        <div className="row g-3">
                                            <div className="col-sm-6 border-end-sm">
                                                <Link to="/blog" className="text-decoration-none">
                                                    <span className="text-muted small d-block mb-1">
                                                        <i className="fa-solid fa-arrow-left me-1"></i> Bài viết trước
                                                    </span>
                                                    <h6 className="text-dark fw-bold mb-0">Công thức Salad Bơ Tươi Dầu Giấm Thanh Mát</h6>
                                                </Link>
                                            </div>
                                            <div className="col-sm-6 text-sm-end">
                                                <Link to="/blog" className="text-decoration-none">
                                                    <span className="text-muted small d-block mb-1">
                                                        Bài tiếp theo <i className="fa-solid fa-arrow-right ms-1"></i>
                                                    </span>
                                                    <h6 className="text-dark fw-bold mb-0">Top 10 Loại Trái Cây Tăng Sức Đề Kháng</h6>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <section id="post-comment" className="border-top pt-4">
                                <h3 className="fw-bold text-dark mb-4">
                                    <i className="fa-regular fa-comments me-2 text-primary"></i>
                                    Bình Luận Độc Giả (3)
                                </h3>

                                <div className="comment-list mb-5">
                                    <div className="d-flex gap-3 mb-4 pb-3 border-bottom">
                                        <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                                            TH
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <h6 className="fw-bold mb-0 text-dark">Trần Minh Hùng</h6>
                                                <small className="text-muted">• 2 ngày trước</small>
                                            </div>
                                            <p className="text-secondary small mb-0">
                                                Bài viết rất hữu ích! Gia đình mình chuyển sang dùng rau củ hữu cơ của FoodMart được 3 tháng nay, cảm thấy sức khỏe cải thiện rõ rệt, rau luộc nước ngọt tự nhiên.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mb-4 pb-3 border-bottom">
                                        <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                                            KO
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <h6 className="fw-bold mb-0 text-dark">Lê Thị Kim Oanh</h6>
                                                <small className="text-muted">• 5 ngày trước</small>
                                            </div>
                                            <p className="text-secondary small mb-0">
                                                Cảm ơn FoodMart đã chia sẻ mẹo bảo quản bằng hộp bọc giấy báo, mình áp dụng thấy rau xà lách để cả tuần trong tủ lạnh vẫn tươi giòn như mới hái!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mb-4 pb-3 border-bottom">
                                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                                            HN
                                        </div>
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <h6 className="fw-bold mb-0 text-dark">Nguyễn Hoàng Nam</h6>
                                                <small className="text-muted">• 1 tuần trước</small>
                                            </div>
                                            <p className="text-secondary small mb-0">
                                                Giao hàng bên shop cực kỳ nhanh, shipper thân thiện và đóng gói cẩn thận. Rất ưng ý chất lượng dịch vụ của cửa hàng.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow-sm border-0 rounded-4 bg-light p-4">
                                    <h4 className="fw-bold text-dark mb-2">Để Lại Bình Luận</h4>
                                    <p className="text-muted small mb-4">
                                        Địa chỉ email của bạn sẽ được bảo mật tuyệt đối. Các trường bắt buộc được đánh dấu <span className="text-danger">*</span>
                                    </p>
                                    <form onSubmit={handleSubmitComment}>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    placeholder="Viết cảm nghĩ hoặc câu hỏi của bạn tại đây... *"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Họ và tên của bạn *"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Địa chỉ Email của bạn *"
                                                    required
                                                />
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="save-info" defaultChecked />
                                                    <label className="form-check-label small text-muted" htmlFor="save-info">
                                                        Lưu tên và email của tôi trong trình duyệt này cho những lần bình luận tiếp theo.
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary px-4 py-2" type="submit">
                                                    Gửi bình luận
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>

            <RecentBlog />
        </div>
    );
}

export default SingleBlog;
