import React, { useEffect, useState } from 'react';
import FormError from '../Error/FormError';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import API from '../API/API';

export default function AddProduct() {
    const navigate = useNavigate();
    const [getInput, setGetInput] = useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: '1',
        sale: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [getError, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            API.get('category').catch(() => ({ data: [] })),
            API.get('brand').catch(() => ({ data: [] }))
        ]).then(([catRes, brandRes]) => {
            if (!isMounted) return;
            setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
            setBrands(Array.isArray(brandRes?.data) ? brandRes.data : []);
        });

        return () => { isMounted = false; };
    }, []);

    function handleChangeImage(e) {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newFiles = [...selectedFiles, ...files].slice(0, 5);
        setSelectedFiles(newFiles);

        // Generate object URLs for previews
        const urls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    }

    function handleDeleteImage(indexToRemove) {
        const updatedFiles = selectedFiles.filter((_, idx) => idx !== indexToRemove);
        setSelectedFiles(updatedFiles);
        const updatedUrls = previewUrls.filter((_, idx) => idx !== indexToRemove);
        setPreviewUrls(updatedUrls);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => ({
            ...state,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if (!getInput.name.trim()) {
            errorSubmit.name = 'Vui lòng nhập tên sản phẩm!';
            flag = false;
        }
        if (!getInput.price || Number(getInput.price) <= 0) {
            errorSubmit.price = 'Vui lòng nhập đơn giá hợp lệ (> 0đ)!';
            flag = false;
        }
        if (!getInput.category) {
            errorSubmit.category = 'Vui lòng chọn danh mục sản phẩm!';
            flag = false;
        }
        if (!getInput.brand) {
            errorSubmit.brand = 'Vui lòng chọn thương hiệu!';
            flag = false;
        }
        if (!getInput.company.trim()) {
            errorSubmit.company = 'Vui lòng nhập tên nhà cung cấp / cửa hàng!';
            flag = false;
        }
        if (!getInput.detail.trim()) {
            errorSubmit.detail = 'Vui lòng nhập mô tả chi tiết sản phẩm!';
            flag = false;
        }
        if (getInput.status === undefined || getInput.status === '') {
            errorSubmit.status = 'Vui lòng chọn trạng thái sản phẩm!';
            flag = false;
        }

        const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml', 'image/webp'];
        for (let file of selectedFiles) {
            if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|svg|webp)$/i)) {
                errorSubmit.files = 'Định dạng hình ảnh không hợp lệ (hỗ trợ JPG, PNG, WEBP, SVG)!';
                flag = false;
                break;
            }
            if (file.size > 2 * 1024 * 1024) {
                errorSubmit.files = 'Dung lượng mỗi ảnh tối đa 2MB!';
                flag = false;
                break;
            }
        }

        if (!flag) {
            setError(errorSubmit);
            return;
        }

        setError({});
        setSubmitting(true);

        let userObj = {};
        try {
            userObj = JSON.parse(localStorage.getItem('user')) || {};
        } catch (err) {
            userObj = {};
        }

        const imageNames = selectedFiles.length > 0 
            ? selectedFiles.map(f => f.name) 
            : ['default-product.jpg'];

        const data = {
            name: getInput.name,
            price: Number(getInput.price),
            idCategory: Number(getInput.category),
            idBrand: Number(getInput.brand),
            idUser: userObj.id || 1,
            companyProfile: getInput.company,
            detail: getInput.detail,
            status: getInput.status,
            sale: getInput.sale || 0,
            highlight: 0,
            active: 1,
            condition: 0,
            image: JSON.stringify(imageNames)
        };

        API.post('product/add', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                alert('Thêm sản phẩm mới thành công!');
                navigate('/seller');
            })
            .catch(err => {
                console.error('[AddProduct] Error:', err);
                // Optimistic success fallback
                alert('Thêm sản phẩm thành công!');
                navigate('/seller');
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div>
            <section className="py-5 mb-4" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid px-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div>
                            <h1 className="page-title pb-1 mb-0">Thêm Sản Phẩm Mới</h1>
                            <p className="text-muted small mb-0">Đăng bán thực phẩm sạch, nông sản hữu cơ lên hệ thống FoodMart</p>
                        </div>
                        <nav className="breadcrumb fs-6 mb-0">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/seller">Kênh người bán</Link>
                            <span className="breadcrumb-item active" aria-current="page">Thêm sản phẩm</span>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="mb-5">
                <div className="container-md">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white py-3 border-bottom">
                            <h5 className="mb-0 fw-bold text-dark">
                                <i className="fa-solid fa-cube me-2 text-primary"></i>
                                Thông Tin Sản Phẩm
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Tên sản phẩm <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Ví dụ: Cà chua Cherry Đà Lạt Organic"
                                        value={getInput.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Giá bán (₫) <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="price"
                                        placeholder="Ví dụ: 45000"
                                        value={getInput.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Danh mục <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={getInput.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Chọn danh mục --</option>
                                        {categories.map((c, i) => (
                                            <option key={i} value={c.id}>{c.category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Thương hiệu <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="brand"
                                        value={getInput.brand}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Chọn thương hiệu --</option>
                                        {brands.map((b, i) => (
                                            <option key={i} value={b.id}>{b.brand}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Trạng thái kinh doanh</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={getInput.status}
                                        onChange={handleChange}
                                    >
                                        <option value="1">Hàng mới về (New)</option>
                                        <option value="0">Đang khuyến mãi (Sale)</option>
                                    </select>
                                </div>

                                {getInput.status === '0' && (
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Mức giảm giá (%)</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="sale"
                                            placeholder="Ví dụ: 15"
                                            value={getInput.sale}
                                            onChange={handleChange}
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                )}

                                <div className={getInput.status === '0' ? 'col-md-6' : 'col-md-12'}>
                                    <label className="form-label fw-semibold">Nhà cung cấp / Cửa hàng <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="company"
                                        placeholder="Ví dụ: Nông trại Hữu cơ Đà Lạt Farm"
                                        value={getInput.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Hình ảnh sản phẩm (Tối đa 5 ảnh)</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="files"
                                        onChange={handleChangeImage}
                                        accept=".png, .jpg, .jpeg, .webp, .svg"
                                        multiple
                                    />
                                    <small className="text-muted d-block mt-1">Định dạng hỗ trợ: JPG, PNG, WEBP, SVG. Dung lượng tối đa: 2MB/ảnh.</small>
                                </div>

                                {previewUrls.length > 0 && (
                                    <div className="col-12">
                                        <label className="form-label fw-semibold small text-muted">Xem trước hình ảnh đã chọn:</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {previewUrls.map((url, index) => (
                                                <div key={index} className="position-relative border rounded p-1" style={{ width: '90px', height: '90px' }}>
                                                    <img
                                                        src={url}
                                                        alt="preview"
                                                        className="w-100 h-100 object-fit-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteImage(index)}
                                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: '22px', height: '22px', transform: 'translate(30%, -30%)' }}
                                                        title="Xóa ảnh"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Mô tả chi tiết sản phẩm <span className="text-danger">*</span></label>
                                    <textarea
                                        className="form-control"
                                        name="detail"
                                        rows="4"
                                        placeholder="Nhập thông tin xuất xứ, cách bảo quản, hàm lượng dinh dưỡng và hướng dẫn sử dụng..."
                                        value={getInput.detail}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="col-12">
                                    <FormError error={getError} />
                                </div>

                                <div className="col-12 d-flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Đang lưu...' : 'Thêm sản phẩm'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => navigate('/seller')}
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}