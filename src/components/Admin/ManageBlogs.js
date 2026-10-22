import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import API from '../API/API';
import { fallbackImage, getImageSrc } from '../utils/imageUtils';

function ManageBlogs() {
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        API.get('user/list')
            .then(function (response) {
                setUsers(Array.isArray(response.data) ? response.data : []);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        API.get('blog/list')
            .then(function (response) {
                setBlogs(Array.isArray(response.data) ? response.data : []);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function renderAuthor(idAuth) {
        let Author = 'Ban biên tập';
        if (Array.isArray(users)) {
            users.forEach((value) => {
                if (value.id === idAuth) {
                    Author = value.name;
                }
            });
        }
        return Author;
    };

    function renderData() {
        return blogs.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td><img src={getImageSrc(value.image)} alt={value.title} width="80px" height="60px" style={{ objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.currentTarget.src = fallbackImage; }} /></td>
                    <td className="fw-semibold">{value.title}</td>
                    <td>{value.description}</td>
                    <td>{value.author || renderAuthor(value.idAuth)}</td>
                    <td><Link to={'/admin/update-blog/' + value.id}><button type="button" className="btn btn-primary btn-sm">Cập nhật</button></Link></td>
                    <td><button id={value.id} type="button" className="btn btn-danger btn-sm" onClick={deleteBlog}>Xóa</button></td>
                </tr>
            )
        })
    };

    function deleteBlog(e) {
        const id = e.target.id;
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            API.delete(`blog/${id}`)
                .then(function (response) {
                    setBlogs(prev => prev.filter(b => String(b.id) !== String(id)));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Quản lý bài viết</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Quản trị</Link>
                            <span className="breadcrumb-item active" aria-current="page">Bài viết</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="container-fluid">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/admin/add-blog" className="btn btn-success">+ Thêm bài viết mới</Link>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Mã ID</th>
                                <th scope='col'>Hình ảnh</th>
                                <th scope="col">Tiêu đề</th>
                                <th scope="col">Tóm tắt nội dung</th>
                                <th scope='col'>Tác giả</th>
                                <th scope="col">Cập nhật</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {renderData()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageBlogs;
