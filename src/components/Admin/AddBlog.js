import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import FormError from '../Error/FormError';
import API from '../API/API';

function AddBlog() {
  const [data, setData] = useState({
    title: '',
    content: '',
    description: ''
  });
  function handleChangeImage(e) {
    const fileInput = e.target.files;
    if (!fileInput || fileInput.length === 0) return;
    let reader = new FileReader();
    reader.onload = function (e) {
      setData((state) => {
        return {
          ...state,
          image: e.target.result,
          file: fileInput[0]
        }
      });
    };
    reader.readAsDataURL(fileInput[0]);
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setData(state => {
      return {
        ...state,
        [name]: value
      }
    })
  };
  const [getError, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const idAuthor = user.id || 1;
    const jsonData = {
      title: data.title,
      content: data.content,
      description: data.description,
      image: data.file ? data.file.name : 'post-thumb-1.jpg',
      idAuth: idAuthor
    };

    API.post('blog/add', jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.data) {
          setError('');
          navigate('/admin/manage-blog');
        } else {
          setError(response.data?.error || 'Thêm bài viết thất bại');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  let navigate = useNavigate();
  function turnBackButton() {
    navigate('/admin/manage-blog');
  }
  return (
    <div>
      <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <h1 className="page-title pb-2">Thêm bài viết mới</h1>
            <nav className="breadcrumb fs-6">
              <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
              <Link className="breadcrumb-item nav-link" to="/admin">Quản trị</Link>
              <span className="breadcrumb-item active" aria-current="page">Thêm bài viết</span>
            </nav>
          </div>
        </div>
      </section>
      <section className='mb-3'>
        <div className="container-sm">
          <form className='row g-3 p-4 border shadow-sm rounded-3 bg-white needs-validation was-validated' noValidate method='post' onSubmit={handleSubmit}>
            <div className='col-md-12'>
              <label className="form-label fw-semibold">Tiêu đề bài viết *</label>
              <input className='form-control' type="text" name="title" onChange={handleChange} placeholder="Nhập tiêu đề hấp dẫn cho bài viết..." required />
              <div className="invalid-feedback">
                Vui lòng nhập tiêu đề bài viết.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label fw-semibold">Tóm tắt ngắn (Description) *</label>
              <input className='form-control' type="text" name="description" onChange={handleChange} placeholder="Mô tả tóm tắt ngắn về bài viết..." required />
              <div className="invalid-feedback">
                Vui lòng nhập tóm tắt nội dung.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label fw-semibold">Hình ảnh minh họa *</label>
              <input className='form-control' type="file" name='image' onChange={handleChangeImage} accept=".png, .jpg, .jpeg" required />
              <div className="invalid-feedback">
                Vui lòng chọn hình ảnh minh họa cho bài viết.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label fw-semibold">Nội dung chi tiết bài viết *</label>
              <textarea className='form-control' name="content" rows={6} onChange={handleChange} placeholder="Nội dung bài viết (hỗ trợ định dạng HTML)..." required></textarea>
              <div className="invalid-feedback">
                Vui lòng nhập nội dung chi tiết bài viết.
              </div>
            </div>
            <div className="d-flex gap-2 mt-4">
              <button type="submit" className="btn btn-primary px-4 py-2">Thêm bài viết</button>
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

export default AddBlog;
