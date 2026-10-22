import { Popover, Steps } from 'antd';
import { useLocation, Link } from "react-router-dom";
import { Card, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getProductImageSrc, getProductName, getProductPrice } from '../utils/productUtils';
import { formatCurrency } from '../utils/cartUtils';

export default function OrderDetail() {
    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    Bước {index + 1} - Trạng thái: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

    const location = useLocation();
    const order = location.state;

    if (!order) {
        return (
            <div className="container py-5 text-center">
                <h3>Không tìm thấy thông tin đơn hàng</h3>
                <Link to="/order" className="btn btn-primary mt-3">Quay lại danh sách đơn hàng</Link>
            </div>
        );
    }

    const renderProduct = (item) => {
        if (!Array.isArray(item)) return null;
        return item.map((product, index) => {
            const p = product.product || {};
            return (
                <Card key={index} style={{ marginTop: 10 }}>
                    <Row align="middle">
                        <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={getProductImageSrc(p)} alt={getProductName(p)} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        </Col>
                        <Col span={14}>
                            <h3>{getProductName(p)}</h3>
                            <p>Đơn giá: {formatCurrency(getProductPrice(p))}</p>
                            <p>Số lượng: {product.quantity}</p>
                        </Col>
                        <Col span={4}>
                            <p style={{color: '#2bb673', fontWeight: 700, fontSize: '1.1rem'}}>Thành tiền: {formatCurrency(getProductPrice(p) * (product.quantity || 1))}</p>
                        </Col>
                    </Row>
                </Card>
            )
        })
    }

    return (
        <div style={{ padding: 20, width: '85%', margin: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Chi tiết đơn hàng</h2>
                <Link to="/order" className="btn btn-outline-secondary">← Quay lại danh sách đơn hàng</Link>
            </div>
            <Steps
                current={1}
                progressDot={customDot}
                items={[
                    {
                        title: 'Đã xác nhận',
                        description: <UserOutlined style={{ color: 'black', fontSize: 20 }} />,
                    },
                    {
                        title: 'Thanh toán',
                    },
                    {
                        title: 'Đang xử lý',
                    },
                    {
                        title: 'Hoàn thành',
                    },
                ]}
            />
            <Card style={{ marginTop: 30, backgroundColor: '#f0f2f5' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title='Thông tin giao hàng'>
                            <p><strong>Mã đơn hàng:</strong> {order.description || order.id}</p>
                            <p><strong>Người nhận:</strong> {order.name}</p>
                            <p><strong>Số điện thoại:</strong> {order.phone}</p>
                            <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='Thông tin thanh toán'>
                            <p><strong>Ngày đặt hàng:</strong> {order.date ? (new Date(order.date).toLocaleDateString() + ' - ' + new Date(order.date).toLocaleTimeString()) : 'N/A'}</p>
                            <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <p style={{color: '#d9534f', fontWeight: 700, fontSize: '1.2rem'}}>Tổng thanh toán: {formatCurrency(order.total)}</p>
                        </Card>
                    </Col>
                </Row>
                <div style={{ marginTop: 20 }}>
                    <h4 className="mb-3">Danh sách sản phẩm</h4>
                    {renderProduct(order.orderDetails)}
                </div>
            </Card>
        </div>
    )
}