import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import FormError from '../Error/FormError';
import axios from 'axios';
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
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/detail/' + id)
            .then(function (response) {
                setData((state) => {
                    return {
                        ...state,
                        title: response.data.title,
                        content: response.data.content,
                        description: response.data.description,
                        idAuth: response.data.idAuth,
                        image: response.data.image
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);
    function handleChangeImage(e) {
        const fileInput = e.target.files;
        if(fileInput){
            let reader = new FileReader();
            reader.onload = function (e) {
                setData((state) => {
                    return {
                        ...state,
                        image: fileInput[0].name,
                    }
                });
            };
            reader.readAsDataURL(fileInput[0]);
        }
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
        const jsonData = {
            title: data.title,
            content: data.content,
            description: data.description,
            image: data.image,
            idAuth: data.idAuth
        };
        console.log(jsonData);
        axios.post('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/update/' + id, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.data) {
                    setError('');
                    navigate('/admin/manage-blog');
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
        navigate('/admin/manage-blog');
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Update Blog</h1>
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
                    <div className='col-md-4'>
                            <label className="form-label">ID Author</label>
                            <input className='form-control' type="text" name="idAuth" onChange={handleChange} value={data.idAuth} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a title.
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <label className="form-label">Blog Title</label>
                            <input className='form-control' type="text" name="title" onChange={handleChange} value={data.title} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a title.
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label">Blog Description</label>
                            <input className='form-control' type="text" name="description" onChange={handleChange} value={data.description} required />
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
                            <textarea className='form-control' name="content" onChange={handleChange} value={data.content} required></textarea>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please enter a content.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Blog</button>
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
export default UpdateBlog;