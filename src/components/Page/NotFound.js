import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="empty-state text-center py-5">
                    <h1 className="page-title display-4 fw-bold">Không tìm thấy trang (404)</h1>
                    <p className="text-muted fs-5 mt-3">Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.</p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
                        <Link to="/" className="btn btn-dark px-4 py-2">Quay lại trang chủ</Link>
                        <Link to="/shop" className="btn btn-primary px-4 py-2">Khám phá sản phẩm</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
