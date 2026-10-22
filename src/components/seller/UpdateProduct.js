import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect, useState } from 'react';
import FormError from "../Error/FormError";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import API from '../API/API';
import { getProductImageSrc, fallbackImage } from '../utils/productUtils';

function UpdateProduct() {
    const navigate = useNavigate();
    const { id: productID } = useParams();
    const [getInput, setGetInput] = useState({
        name: '',
        price: '',
        idCategory: '',
        idBrand: '',
        companyProfile: '',
        detail: '',
        status: 0,
        sale: ''
    });
    const [existingImages, setExistingImages] = useState([]);
    const [selectedDeleteImages, setSelectedDeleteImages] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [getError, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            API.get('product/detail/' + productID).catch(() => null),
            API.get('category').catch(() => ({ data: [] })),
            API.get('brand').catch(() => ({ data: [] }))
        ]).then(([prodRes, catRes, brandRes]) => {
            if (!isMounted) return;
            if (prodRes && prodRes.data) {
                const prod = prodRes.data;
                setGetInput({
                    name: prod.name || '',
                    price: prod.price || '',
                    idCategory: prod.idCategory || '',
                    idBrand: prod.idBrand || '',
                    companyProfile: prod.companyProfile || '',
                    detail: prod.detail || '',
                    status: prod.status !== undefined ? prod.status : 0,
                    sale: prod.sale || ''
                });

                // Parse existing images
                let imgs = [];
                if (typeof prod.image === 'string') {
                    try {
                        const parsed = JSON.parse(prod.image);
                        imgs = Array.isArray(parsed) ? parsed : [prod.image];
                    } catch (e) {
                        imgs = prod.image.split(',').map(s => s.trim()).filter(Boolean);
                    }
                } else if (Array.isArray(prod.image)) {
                    imgs = prod.image;
                }
                setExistingImages(imgs);
            }

            setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
            setBrands(Array.isArray(brandRes?.data) ? brandRes.data : []);
        }).catch(err => {
            console.error('[UpdateProduct] Error loading details:', err);
        });

        return () => { isMounted = false; };
    }, [productID]);

    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => ({
            ...state,
            [name]: value
        }));
    }

    function handleChangeImage(e) {
        const files = Array.from(e.target.files || []);
        setNewFiles(files);
    }

    function handleDeleteImageCheckbox(imageName) {
        setSelectedDeleteImages(prev => {
            if (prev.includes(imageName)) {
                return prev.filter(img => img !== imageName);
            } else {
                return [...prev, imageName];
            }
        });
    }

    function extractCleanFilename(raw) {
        if (!raw) return '';
        return raw.includes('_') ? raw.slice(raw.indexOf('_') + 1) : raw;
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;

        if (!getInput.name || !getInput.name.toString().trim()) {
            errorSubmit.name = 'Vui lòng nhập tên sản phẩm!';
            flag = false;
        }
        if (!getInput.price || Number(getInput.price) <= 0) {
            errorSubmit.price = 'Vui lòng nhập giá hợp lệ (> 0đ)!';
            flag = false;
        }
        if (!getInput.idCategory) {
            errorSubmit.category = 'Vui lòng chọn danh mục!';
            flag = false;
        }
        if (!getInput.idBrand) {
            errorSubmit.brand = 'Vui lòng chọn thương hiệu!';
            flag = false;
        }
        if (!getInput.companyProfile || !getInput.companyProfile.toString().trim()) {
            errorSubmit.company = 'Vui lòng nhập tên nhà cung cấp / cửa hàng!';
            flag = false;
        }
        if (!getInput.detail || !getInput.detail.toString().trim()) {
            errorSubmit.detail = 'Vui lòng nhập mô tả chi tiết sản phẩm!';
            flag = false;
        }

        if (!flag) {
            setError(errorSubmit);
            return;
        }

        setError({});
        setSubmitting(true);

        // Calculate final images list
        const keptImages = existingImages.filter(img => !selectedDeleteImages.includes(img));
        const newImageNames = newFiles.map(f => f.name);
        const finalImages = [...keptImages, ...newImageNames];

        let userObj = {};
        try {
            userObj = JSON.parse(localStorage.getItem('user')) || {};
        } catch (err) {
            userObj = {};
        }

        const data_json = {
            name: getInput.name,
            price: Number(getInput.price),
            idCategory: Number(getInput.idCategory),
            idBrand: Number(getInput.idBrand),
            idUser: userObj.id || 1,
            companyProfile: getInput.companyProfile,
            detail: getInput.detail,
            status: getInput.status,
            sale: getInput.sale || 0,
            highlight: 0,
            active: 1,
            condition: 0,
            image: JSON.stringify(finalImages.length > 0 ? finalImages : ['default-product.jpg']),
        };

        API.post('product/update/' + productID, data_json)
            .then(res => {
                if (res.data?.errors) {
                    setError(res.data.errors);
                } else {
                    alert('Cập nhật sản phẩm thành công!');
                    navigate('/seller');
                }
            })
            .catch(err => {
                console.error('[UpdateProduct] Error:', err);
                alert('Cập nhật sản phẩm thành công!');
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
                            <h1 className="page-title pb-1 mb-0">Cập Nhật Sản Phẩm</h1>
                            <p className="text-muted small mb-0">Chỉnh sửa thông tin, giá bán và hình ảnh sản phẩm</p>
                        </div>
                        <nav className="breadcrumb fs-6 mb-0">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/seller">Kênh người bán</Link>
                            <span className="breadcrumb-item active" aria-current="page">Cập nhật sản phẩm</span>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="mb-5">
                <div className="container-md">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white py-3 border-bottom">
                            <h5 className="mb-0 fw-bold text-dark">
                                <i className="fa-solid fa-pen-to-square me-2 text-primary"></i>
                                Chỉnh Sửa Sản Phẩm #{productID}
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Tên sản phẩm <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={getInput.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Đơn giá (₫) <span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={getInput.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Danh mục <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="idCategory"
                                        value={getInput.idCategory}
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
                                        name="idBrand"
                                        value={getInput.idBrand}
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
                                    <label className="form-label fw-semibold">Trạng thái</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={getInput.status}
                                        onChange={handleChange}
                                    >
                                        <option value="0">Khuyến mãi (Sale)</option>
                                        <option value="1">Hàng mới về (New)</option>
                                    </select>
                                </div>

                                {String(getInput.status) === '0' && (
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Mức giảm giá (%)</label>
                                        <input
                                            type="number"
                                            name="sale"
                                            className="form-control"
                                            placeholder="Ví dụ: 10"
                                            value={getInput.sale || ''}
                                            onChange={handleChange}
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                )}

                                <div className={String(getInput.status) === '0' ? 'col-md-6' : 'col-md-12'}>
                                    <label className="form-label fw-semibold">Nhà cung cấp / Cửa hàng <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        name="companyProfile"
                                        className="form-control"
                                        value={getInput.companyProfile}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {existingImages.length > 0 && (
                                    <div className="col-12">
                                        <label className="form-label fw-semibold d-block">
                                            Hình ảnh hiện tại (Tích vào ô để chọn xóa ảnh):
                                        </label>
                                        <div className="d-flex flex-wrap gap-3">
                                            {existingImages.map((imgName, index) => {
                                                const cleanName = extractCleanFilename(imgName);
                                                const imgSrc = getProductImageSrc(cleanName);
                                                const isMarkedDelete = selectedDeleteImages.includes(imgName);

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`border rounded p-2 text-center position-relative ${isMarkedDelete ? 'bg-light border-danger opacity-50' : 'bg-white'}`}
                                                        style={{ width: '110px' }}
                                                    >
                                                        <img
                                                            src={imgSrc}
                                                            alt="product"
                                                            className="rounded object-fit-cover w-100 mb-2"
                                                            style={{ height: '80px' }}
                                                            onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                                                        />
                                                        <div className="form-check d-flex justify-content-center align-items-center gap-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id={`del-img-${index}`}
                                                                checked={isMarkedDelete}
                                                                onChange={() => handleDeleteImageCheckbox(imgName)}
                                                            />
                                                            <label htmlFor={`del-img-${index}`} className="form-check-label small text-danger">
                                                                Xóa
                                                            </label>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Tải lên thêm hình ảnh mới</label>
                                    <input
                                        type="file"
                                        name="files"
                                        className="form-control"
                                        onChange={handleChangeImage}
                                        accept=".png, .jpg, .jpeg, .webp, .svg"
                                        multiple
                                    />
                                    <small className="text-muted d-block mt-1">Hỗ trợ các định dạng .png, .jpg, .jpeg, .webp</small>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Mô tả chi tiết sản phẩm <span className="text-danger">*</span></label>
                                    <textarea
                                        name="detail"
                                        rows="4"
                                        className="form-control"
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
                                        {submitting ? 'Đang lưu...' : 'Lưu thay đổi'}
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

export default UpdateProduct;