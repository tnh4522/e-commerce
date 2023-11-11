import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import FormError from '../Error/FormError';
import axios from 'axios';
function AddBlog() {
  const [data, setData] = useState({
    title: '',
    content: '',
    description: ''
  });
  function handleChangeImage(e) {
    const fileInput = e.target.files;
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
    const idAuthor = JSON.parse(localStorage.getItem('user')).id;
    const jsonData = {
      title: data.title,
      content: data.content,
      description: data.description,
      image: data.file.name,
      idAuth: idAuthor,
    };
  
    axios.post('http://localhost:8080/api/blog', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.data) {
          setError('');
          navigate('/admin/manage-blogs');
        } else {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  
  let navigate = useNavigate();
  function turnBackButton() {
    navigate('/admin/manage-blogs');
  }
  return (
    <div>
      <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <h1 className="page-title pb-2">Add New Blog</h1>
            <nav className="breadcrumb fs-6">
              <Link className="breadcrumb-item nav-link" to="/">Home</Link>
              <Link className="breadcrumb-item nav-link" to="">Pages</Link>
              <span className="breadcrumb-item active" aria-current="page">Admin</span>
            </nav>
          </div>
        </div>
      </section>
      <section className='mb-3'>
        <div className="container-sm">
          <form className='row g-2 p-3 border shadow-lg needs-validation was-validated' noValidate encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
            <div className='col-md-12'>
              <label className="form-label">Blog Title</label>
              <input className='form-control' type="text" name="title" onChange={handleChange} required />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please enter a title.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label">Blog Description</label>
              <input className='form-control' type="text" name="description" onChange={handleChange} required />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please enter a description.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label">Blog Image</label>
              <input className='form-control' type="file" name='image' onChange={handleChangeImage} accept=".png, .jpg, .jpeg" required />
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please choose a image.
              </div>
            </div>
            <div className='col-md-12'>
              <label className="form-label">Blog Content</label>
              <textarea className='form-control' name="content" onChange={handleChange} required></textarea>
              <div className="valid-feedback">
                Looks good!
              </div>
              <div className="invalid-feedback">
                Please enter a content.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Blog</button>
            <button type="button" className="btn btn-danger" onClick={turnBackButton}>Go Back</button>
          </form>
          <div className='col-md-12'>
            <FormError error={getError} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddBlog;