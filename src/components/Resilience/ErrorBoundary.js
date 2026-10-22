/**
 * ErrorBoundary.js
 *
 * Catches JavaScript and render errors in the React component tree to prevent
 * the entire application from crashing into a blank white screen.
 */

import React from 'react';
import offlineStore from '../../services/resilience/offlineStore';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            showDetails: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[ErrorBoundary caught an error]:', error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    handleReload = () => {
        window.location.reload();
    };

    handleRestoreDefaults = () => {
        if (window.confirm('Khôi phục toàn bộ dữ liệu mẫu mặc định của cửa hàng?')) {
            offlineStore.resetToDefaults();
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="container py-5 my-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                                <div className="card-header bg-warning bg-gradient text-dark py-4 px-4 border-0">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-white p-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '56px', height: '56px' }}>
                                            <span style={{ fontSize: '28px' }}>🛡️</span>
                                        </div>
                                        <div>
                                            <h4 className="mb-1 fw-bold">FoodMart - Chế độ Ổn định Ngoại tuyến</h4>
                                            <p className="mb-0 text-dark-50 small">Lớp bảo vệ Resilience Layer đã ngăn ngừa lỗi màn hình trắng toàn trang.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4 p-md-5">
                                    <h5 className="fw-semibold text-dark mb-3">Ứng dụng đã được cách ly an toàn</h5>
                                    <p className="text-secondary mb-4">
                                        Hệ thống phát hiện sự cố không mong muốn trong khi hiển thị thành phần giao diện. 
                                        Toàn bộ dữ liệu giỏ hàng và danh mục của bạn vẫn được lưu trữ an toàn trong bộ nhớ cục bộ.
                                    </p>

                                    <div className="d-flex flex-wrap gap-2 mb-4">
                                        <button className="btn btn-primary px-4 py-2" onClick={this.handleReload}>
                                            🔄 Tải lại trang
                                        </button>
                                        <button className="btn btn-outline-secondary px-4 py-2" onClick={this.handleReset}>
                                            🏠 Về trang chủ
                                        </button>
                                        <button className="btn btn-outline-danger px-3 py-2 ms-auto" onClick={this.handleRestoreDefaults}>
                                            ⚙️ Khôi phục dữ liệu mẫu
                                        </button>
                                    </div>

                                    <div className="border-top pt-3">
                                        <button
                                            type="button"
                                            className="btn btn-link text-decoration-none p-0 text-muted small"
                                            onClick={() => this.setState(s => ({ showDetails: !s.showDetails }))}
                                        >
                                            {this.state.showDetails ? '▼ Ẩn chi tiết kỹ thuật' : '▶ Xem chi tiết lỗi kỹ thuật (Dành cho Developer)'}
                                        </button>

                                        {this.state.showDetails && (
                                            <div className="mt-3 p-3 bg-light rounded-3 border text-start">
                                                <p className="text-danger fw-bold small mb-2">{this.state.error?.toString()}</p>
                                                <pre className="small text-muted mb-0" style={{ maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                                                    {this.state.errorInfo?.componentStack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
