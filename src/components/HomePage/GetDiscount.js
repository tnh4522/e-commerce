import bgleavesimgpattern from '../../images/bg-leaves-img-pattern.png';

function GetDiscount() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="bg-secondary py-5 my-5 rounded-5" style={{ background: `url(${bgleavesimgpattern}) no-repeat` }}>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-6 p-5">
                                <div className="section-header">
                                    <h2 className="section-title display-4">Nhận ngay ưu đãi <span className="text-primary">Giảm 25%</span> cho đơn hàng đầu tiên</h2>
                                </div>
                                <p>Trải nghiệm siêu thị thực phẩm hữu cơ chuẩn xanh, đảm bảo tươi ngon và an toàn cho sức khỏe của cả gia đình bạn.</p>
                            </div>
                            <div className="col-md-6 p-5">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control form-control-lg" name="name" id="name" placeholder="Nhập họ và tên..." />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Địa chỉ Email</label>
                                        <input type="email" className="form-control form-control-lg" name="email" id="email" placeholder="email@vidu.com" />
                                    </div>
                                    <div className="form-check form-check-inline mb-3">
                                        <label className="form-check-label" htmlFor="subscribe">
                                            <input className="form-check-input" type="checkbox" id="subscribe" defaultValue="subscribe" />
                                            Đồng ý nhận thông tin khuyến mãi qua email</label>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-dark btn-lg">Đăng ký nhận ưu đãi</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default GetDiscount;