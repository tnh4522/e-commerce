import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import FormError from '../Error/FormError';
import API from '../API/API';

function UpdateBlog() {
    const [data, setData] = useState({
        title: '',
        content: '',
        description: '',
        idAuth: '',
        image: ''
    });

    let { id } = useParams();
    useEffect(() => {
        API.get('blog/detail/' + id)
            .then(function (response) {
                const blog = (response && response.data) ? response.data : response;
                if (blog) {
                    setData((state) => ({
                        ...state,
                        title: blog.title || '',
                        content: blog.content || '',
                        description: blog.description || '',
                        idAuth: blog.idAuth || 1,
                        image: blog.image || ''
                    }));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    function handleChangeImage(e) {
        const fileInput = e.target.files;
        if (fileInput && fileInput.length > 0) {
            let reader = new FileReader();
            reader.onload = function (e) {
                setData((state) => ({
                    ...state,
                    image: fileInput[0].name,
                }));
            };
            reader.readAsDataURL(fileInput[0]);
        }
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setData(state => ({
            ...state,
            [name]: value
        }));
    };

    const [getError, setError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const jsonData = {
            title: data.title,
            content: data.content,
            description: data.description,
            image: data.image,
            idAuth: data.idAuth
        };

        API.post('blog/update/' + id, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data) {
                    setError('');
                    navigate('/admin/manage-blog');
                } else {
                    setError(response.data?.error || 'Cập nhật thất bại');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    let navigate = useNavigate();
    function turnBackButton() {
        navigate('/admin/manage-blog');
    };

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Cập nhật bài viết</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Quản trị</Link>
                            <span className="breadcrumb-item active" aria-current="page">Cập nhật</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className='mb-3'>
                <div className="container-sm">
                    <form className='row g-3 p-4 border shadow-sm rounded-3 bg-white needs-validation was-validated' noValidate encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                        <div className='col-md-4'>
                            <label className="form-label fw-semibold">Mã tác giả</label>
                            <input className='form-control' type="text" name="idAuth" onChange={handleChange} value={data.idAuth} required />
                            <div className="invalid-feedback">
                                Vui lòng nhập mã tác giả.
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <label className="form-label fw-semibold">Tiêu đề bài viết *</label>
                            <input className='form-control' type="text" name="title" onChange={handleChange} value={data.title} required />
                            <div className="invalid-feedback">
                                Vui lòng nhập tiêu đề bài viết.
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label fw-semibold">Tóm tắt ngắn (Description) *</label>
                            <input className='form-control' type="text" name="description" onChange={handleChange} value={data.description} required />
                            <div className="invalid-feedback">
                                Vui lòng nhập tóm tắt nội dung.
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label fw-semibold">Hình ảnh minh họa *</label>
                            <input className='form-control' type="file" name='image' onChange={handleChangeImage} accept=".png, .jpg, .jpeg" />
                            {data.image && <div className="form-text">Ảnh hiện tại: {data.image}</div>}
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label fw-semibold">Nội dung chi tiết bài viết *</label>
                            <textarea className='form-control' name="content" rows={6} onChange={handleChange} value={data.content} required></textarea>
                            <div className="invalid-feedback">
                                Vui lòng nhập nội dung chi tiết bài viết.
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button type="submit" className="btn btn-primary px-4 py-2">Lưu cập nhật</button>
                            <button type="button" className="btn btn-secondary px-4 py-2" onClick={turnBackButton}>Quay lại</button>
                        </div>
                    </form>
                    <div className='col-md-12 mt-3'>
                        <FormError error={getError} />
                    </div>
                </div>
            </section>
        </div>
    );
}
export default UpdateBlog;
