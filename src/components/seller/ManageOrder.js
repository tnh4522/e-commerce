import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState, useEffect } from 'react';
import API from '../API/API';
import { formatCurrency } from '../utils/cartUtils';

function ManageOrders() {
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        API.get('order/list')
            .then(function (response) {
                if (!isMounted) return;
                const orders = Array.isArray(response.data) ? response.data : [];
                setData(orders);
                setLoading(false);
            })
            .catch(function (error) {
                console.error('[ManageOrders] Error fetching orders:', error);
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    function renderData() {
        if (loading) {
            return (
                <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">
                        <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                        Đang tải danh sách đơn hàng...
                    </td>
                </tr>
            );
        }

        if (getData.length === 0) {
            return (
                <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                        <i className="fa-solid fa-receipt fa-2x mb-2 d-block"></i>
                        Hiện tại chưa có đơn đặt hàng nào trong hệ thống.
                    </td>
                </tr>
            );
        }

        return getData.map((value, key) => {
            return (
                <tr key={key} className="align-middle">
                    <td className="fw-bold text-primary">#{value.id}</td>
                    <td className="fw-semibold text-dark">{value.name || 'Khách hàng'}</td>
                    <td className="small text-muted">{value.email}</td>
                    <td className="small">{value.phone}</td>
                    <td className="small text-truncate" style={{ maxWidth: '220px' }} title={value.address}>
                        {value.address}
                    </td>
                    <td><span className="badge bg-light text-secondary border">KH #{value.userId}</span></td>
                    <td className="fw-bold text-success">
                        {formatCurrency(value.total)}
                    </td>
                    <td className="small text-muted">{value.updatedAt || 'Hôm nay'}</td>
                    <td>
                        <Link to={`/order/detail`} className="btn btn-sm btn-outline-primary">
                            <i className="fa fa-eye me-1"></i> Xem chi tiết
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <section className="py-5 mb-4" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid px-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div>
                            <h1 className="page-title pb-1 mb-0">Quản Lý Đơn Hàng</h1>
                            <p className="text-muted small mb-0">Theo dõi thông tin thanh toán và trạng thái giao hàng</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <Link to="/seller" className="btn btn-outline-secondary">
                                <i className="fa fa-arrow-left me-1"></i> Quản lý sản phẩm
                            </Link>
                            <nav className="breadcrumb fs-6 mb-0">
                                <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                                <Link className="breadcrumb-item nav-link" to="/seller">Kênh người bán</Link>
                                <span className="breadcrumb-item active" aria-current="page">Đơn hàng</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid px-4 mb-5">
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold text-dark">
                            <i className="fa-solid fa-receipt me-2 text-primary"></i>
                            Tất Cả Đơn Đặt Hàng ({getData.length})
                        </h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Mã đơn</th>
                                    <th scope="col">Khách hàng</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ nhận hàng</th>
                                    <th scope="col">Mã khách</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageOrders;