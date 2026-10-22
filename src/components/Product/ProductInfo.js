import { getProductDescription, getProductName } from "../utils/productUtils";

function ProductInfo({ product }) {
    const description = getProductDescription(product);
    const title = getProductName(product);

    return (
        <section className="product-info-tabs py-5 bg-light-subtle border-top border-bottom">
            <div className="container-fluid px-4">
                <div className="row">
                    <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                        <div className="nav flex-row flex-wrap flex-md-column nav-pills me-md-3 col-lg-3 bg-white p-3 rounded-4 shadow-sm" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link text-start active py-3 fw-semibold" id="v-pills-description-tab" data-bs-toggle="pill" data-bs-target="#v-pills-description" type="button" role="tab" aria-controls="v-pills-description" aria-selected="true">
                                <i className="fa-solid fa-file-lines me-2 text-primary"></i>
                                Mô tả chi tiết
                            </button>
                            <button className="nav-link text-start py-3 fw-semibold" id="v-pills-additional-tab" data-bs-toggle="pill" data-bs-target="#v-pills-additional" type="button" role="tab" aria-controls="v-pills-additional" aria-selected="false">
                                <i className="fa-solid fa-list-check me-2 text-success"></i>
                                Thông số & Nguồn gốc
                            </button>
                            <button className="nav-link text-start py-3 fw-semibold" id="v-pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reviews" type="button" role="tab" aria-controls="v-pills-reviews" aria-selected="false">
                                <i className="fa-solid fa-star me-2 text-warning"></i>
                                Đánh giá từ khách hàng ({product?.reviewsCount || 128})
                            </button>
                        </div>

                        <div className="tab-content flex-grow-1 bg-white p-4 p-md-5 rounded-4 shadow-sm" id="v-pills-tabContent">
                            {/* Tab 1: Detailed Description */}
                            <div className="tab-pane fade show active" id="v-pills-description" role="tabpanel" aria-labelledby="v-pills-description-tab" tabIndex={0}>
                                <h4 className="fw-bold text-dark mb-3">{title}</h4>
                                <p className="text-secondary lead fs-6 mb-4">{description}</p>
                                
                                <h5 className="fw-bold text-dark mt-4 mb-3">Đặc điểm nổi bật của sản phẩm</h5>
                                <ul className="list-unstyled ps-0">
                                    <li className="py-2 d-flex align-items-start">
                                        <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                        <span><strong>100% Nông sản tươi sạch:</strong> Canh tác theo phương pháp sinh thái hữu cơ, hoàn toàn không sử dụng phân bón hóa học độc hại hay thuốc kích thích tăng trưởng.</span>
                                    </li>
                                    <li className="py-2 d-flex align-items-start">
                                        <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                        <span><strong>Thu hoạch và giao ngay trong ngày:</strong> Sản phẩm được hái từ sáng sớm tại nông trại và chuyển thẳng tới kho hàng FoodMart, đảm bảo độ tươi ngọt tự nhiên.</span>
                                    </li>
                                    <li className="py-2 d-flex align-items-start">
                                        <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                        <span><strong>Đóng gói tiêu chuẩn xuất khẩu:</strong> Sử dụng bao bì thân thiện môi trường, có lỗ thoát khí sinh học giúp bảo quản dưỡng chất nguyên vẹn lâu hơn.</span>
                                    </li>
                                </ul>

                                <h5 className="fw-bold text-dark mt-4 mb-2">Hướng dẫn bảo quản & Sử dụng</h5>
                                <p className="text-secondary">
                                    {product?.storage || 'Bảo quản sản phẩm ở nhiệt độ mát từ 4°C - 8°C (ngăn mát tủ lạnh). Rửa sạch nhẹ nhàng với nước muối loãng trước khi chế biến.'}
                                </p>
                            </div>

                            {/* Tab 2: Specifications & Origin Mockup */}
                            <div className="tab-pane fade" id="v-pills-additional" role="tabpanel" aria-labelledby="v-pills-additional-tab" tabIndex={0}>
                                <h4 className="fw-bold text-dark mb-4">Bảng Thông Số Kỹ Thuật & Tiêu Chuẩn Nông Sản</h4>
                                
                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <tbody>
                                            <tr>
                                                <th className="bg-light text-muted w-25">Nguồn gốc xuất xứ</th>
                                                <td className="fw-medium text-dark">{product?.origin || 'Đà Lạt, Lâm Đồng (Việt Nam)'}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Quy cách đóng gói</th>
                                                <td className="fw-medium text-dark">{product?.weight || 'Hộp 500g tiêu chuẩn'}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Tiêu chuẩn kiểm định</th>
                                                <td>
                                                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                                        {product?.standard || 'VietGAP / Tiêu chuẩn Hữu cơ Organic'}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Hạn sử dụng</th>
                                                <td className="fw-medium text-dark">{product?.expiry || '3 - 5 ngày (Bảo quản mát 4°C - 8°C)'}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Năng lượng / Calo</th>
                                                <td className="fw-medium text-dark">{product?.nutrition?.calories || '32 kcal / 100g'}</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Hàm lượng Vitamin</th>
                                                <td className="fw-medium text-dark">Vitamin C ({product?.nutrition?.vitaminC || '28mg'}), Vitamin A, Sắt, Kali</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Chất xơ tự nhiên</th>
                                                <td className="fw-medium text-dark">{product?.nutrition?.fiber || '2.4g'} (Giúp hỗ trợ hệ tiêu hóa khỏe mạnh)</td>
                                            </tr>
                                            <tr>
                                                <th className="bg-light text-muted">Chứng nhận an toàn</th>
                                                <td className="fw-medium text-dark">Không biến đổi gen (Non-GMO), Không dư lượng thuốc bảo vệ thực vật</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Tab 3: Customer Reviews */}
                            <div className="tab-pane fade" id="v-pills-reviews" role="tabpanel" aria-labelledby="v-pills-reviews-tab" tabIndex={0}>
                                <div className="d-flex flex-wrap justify-content-between align-items-center pb-4 mb-4 border-bottom">
                                    <div>
                                        <h4 className="fw-bold text-dark mb-1">Đánh Giá Từ Khách Hàng</h4>
                                        <p className="text-muted small mb-0">Tất cả nhận xét đều từ người mua hàng thực tế tại FoodMart</p>
                                    </div>
                                    <div className="text-center bg-light p-3 rounded-3 border">
                                        <div className="display-6 fw-bold text-warning">{product?.rating || 4.9}</div>
                                        <div className="text-warning small mb-1">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <small className="text-muted">Dựa trên {product?.reviewsCount || 128} đánh giá</small>
                                    </div>
                                </div>

                                <div className="review-list">
                                    <div className="review-item mb-4 pb-4 border-bottom">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                    TH
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0 text-dark">Nguyễn Thu Hà</h6>
                                                    <small className="text-success"><i className="fa-solid fa-circle-check me-1"></i>Đã mua tại FoodMart</small>
                                                </div>
                                            </div>
                                            <div className="text-warning small">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <span className="text-muted ms-2 small">• 2 ngày trước</span>
                                            </div>
                                        </div>
                                        <p className="text-secondary mb-0">
                                            Sản phẩm nhận được rất tươi ngon, cuống còn xanh mọng nước. Đóng gói hộp giấy sạch sẽ và shipper giao tới rất nhanh trong 1 tiếng rưỡi. Chắc chắn sẽ tiếp tục ủng hộ FoodMart!
                                        </p>
                                    </div>

                                    <div className="review-item mb-4 pb-4 border-bottom">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                    MQ
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0 text-dark">Trần Minh Quân</h6>
                                                    <small className="text-success"><i className="fa-solid fa-circle-check me-1"></i>Đã mua tại FoodMart</small>
                                                </div>
                                            </div>
                                            <div className="text-warning small">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <span className="text-muted ms-2 small">• 1 tuần trước</span>
                                            </div>
                                        </div>
                                        <p className="text-secondary mb-0">
                                            Chất lượng nông sản đạt chuẩn organic thật sự, nấu canh vị ngọt thanh mát khác hẳn rau mua ngoài chợ thông thường. Giá cả rất hợp lý so với chất lượng mang lại.
                                        </p>
                                    </div>
                                </div>

                                <div className="add-review mt-5 bg-light p-4 rounded-4 border">
                                    <h5 className="fw-bold text-dark mb-2">Gửi Đánh Giá Của Bạn</h5>
                                    <p className="text-muted small mb-4">Chia sẻ trải nghiệm sử dụng thực tế để giúp cộng đồng người tiêu dùng lựa chọn tốt hơn</p>
                                    
                                    <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đóng góp đánh giá cho sản phẩm!'); e.target.reset(); }}>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Đánh giá chung</label>
                                                <div className="text-warning fs-5">
                                                    <i className="fa-solid fa-star cursor-pointer me-1"></i>
                                                    <i className="fa-solid fa-star cursor-pointer me-1"></i>
                                                    <i className="fa-solid fa-star cursor-pointer me-1"></i>
                                                    <i className="fa-solid fa-star cursor-pointer me-1"></i>
                                                    <i className="fa-solid fa-star cursor-pointer"></i>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <textarea className="form-control" rows={3} placeholder="Mô tả cảm nhận về độ tươi ngon, chất lượng đóng gói và dịch vụ giao hàng..." required></textarea>
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="Họ và tên của bạn *" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="email" className="form-control" placeholder="Địa chỉ email *" required />
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary px-4 py-2">
                                                    Gửi nhận xét
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductInfo;