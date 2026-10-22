import backgroundPattern from '../../images/background-pattern.jpg';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Thông tin liên hệ</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                            <span className="breadcrumb-item active" aria-current="page">Liên hệ</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="contact-us py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="contact-info col-lg-6 pb-3">
                            <p className="fs-5 text-muted mb-4">Đội ngũ FoodMart luôn sẵn sàng lắng nghe mọi ý kiến đóng góp và giải đáp mọi thắc mắc của quý khách hàng nhanh chóng nhất.</p>
                            <div className="page-content d-flex flex-wrap">
                                <div className="col-lg-6 col-sm-12">
                                    <div className="content-box text-dark pe-4 mb-5">
                                        <h3 className="card-title fw-bold">Trụ sở chính TP.HCM</h3>
                                        <div className="contact-address pt-3">
                                            <p>123 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                                        </div>
                                        <div className="contact-number">
                                            <p>
                                                <a href="tel:19006868">Hotline: 1900 6868</a>
                                            </p>
                                            <p>
                                                <a href="tel:0901234567">Di động: 0901 234 567</a>
                                            </p>
                                        </div>
                                        <div className="email-address">
                                            <p>
                                                <a href="mailto:support@foodmart.vn">support@foodmart.vn</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="content-box">
                                        <h3 className="card-title fw-bold">Chi nhánh Hà Nội</h3>
                                        <div className="contact-address pt-3">
                                            <p>789 Nguyễn Trãi, Phường Thanh Xuân Bắc, Quận Thanh Xuân, Hà Nội</p>
                                        </div>
                                        <div className="contact-number">
                                            <p>
                                                <a href="tel:02438558899">Hotline: (024) 3855 8899</a>
                                            </p>
                                            <p>
                                                <a href="tel:0912345678">Di động: 0912 345 678</a>
                                            </p>
                                        </div>
                                        <div className="email-address">
                                            <p>
                                                <a href="mailto:hanoi@foodmart.vn">hanoi@foodmart.vn</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inquiry-item col-lg-6">
                            <div className="bg-light p-5 rounded-5">
                                <h2 className="display-7 text-dark">Gửi thắc mắc cho chúng tôi</h2>
                                <p>Vui lòng điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
                                <form id="form" className="form-group flex-wrap" onSubmit={(event) => { event.preventDefault(); alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.'); }}>
                                    <div className="form-input col-lg-12 d-flex mb-3">
                                        <input type="text" name="name" placeholder="Họ và tên *" className="form-control ps-3 me-3" required />
                                        <input type="email" name="email" placeholder="Địa chỉ Email *" className="form-control ps-3" required />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <input type="tel" name="phone" placeholder="Số điện thoại *" className="form-control ps-3" required />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <input type="text" name="subject" placeholder="Tiêu đề tin nhắn *" className="form-control ps-3" required />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <textarea placeholder="Nội dung tin nhắn liên hệ..." className="form-control ps-3" style={{ height: '150px' }} required defaultValue={""} />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg text-uppercase btn-rounded-none">Gửi tin nhắn</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Contact;
