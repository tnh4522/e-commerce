import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import FormError from "../Error/FormError";
import axios from "axios";
function UpdateUser() {
    let { id } = useParams();
    const [getInput, setInput] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        country: '',
        avatar: ''
    });
    const inputFileRef = useRef(null);
    const handlePhotoChangeClick = (event) => {
        event.preventDefault();
        inputFileRef.current.click();
    };
    useEffect(() => {
        axios.get('http://localhost:8080/api/user/' + id)
            .then(function (response) {
                setInput((state) => {
                    return {
                        ...state,
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        phone: response.data.phone,
                        address: response.data.address,
                        country: response.data.country,
                        avatar: response.data.avatar
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    let navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            flag = false;
            errorSubmit.name = 'Please enter your name';
        }
        if (getInput.phone === '') {
            flag = false;
            errorSubmit.phone = 'Please enter your phone number';
        }
        if (getInput.address === '') {
            flag = false;
            errorSubmit.address = 'Please enter your address';
        }
        if (getInput.country === '') {
            flag = false;
            errorSubmit.country = 'Please enter your country';
        }
        if (flag === false) {
            setError(errorSubmit);
        } else {
            setError('');

            const data_json = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password === '' ? null : getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                country: getInput.country,
                avatar: getInput.file ? getInput.file.name : null
            }
            
            axios.post('http://localhost:8080/api/user/update/' + id, data_json)
                .then(function (response) {
                    if(window.confirm('Are you sure you want to update this user?')){
                        if (response.status === 200) {
                            navigate('/admin');
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    function handleInputFile(e) {
        const fileInput = e.target.files;
        let reader = new FileReader();
        reader.onload = function (e) {
            setInput((state) => {
                return {
                    ...state,
                    avatar: e.target.result,
                    file: fileInput[0]
                }
            });
        };
        reader.readAsDataURL(fileInput[0]);
    };
    const avatar = getInput.file ? getInput.file.name : getInput.avatar;
    let imgSrc;
    try {
        imgSrc = require('../../images/' + avatar);
    } catch (error) {
        console.warn('Image not found, using default or leaving it blank');
        imgSrc = require('../../images/logo.png');
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Update User</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Admin</Link>
                            <span className="breadcrumb-item active" aria-current="page">User</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 p-5 border shadow-sm">
                            <form id="form" className="form-group flex-wrap" method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Full Name</label>
                                    <input type="text" name="name" value={getInput.name} className="form-control" onChange={handleInput} autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Email address</label>
                                    <input type="email" name="email" value={getInput.email} className="form-control" onChange={handleInput} readOnly />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Password</label>
                                    <input type="password" name="password" className="form-control" onChange={handleInput} value={getInput.password} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Telephone Number</label>
                                    <input type="text" name="phone" className="form-control" onChange={handleInput} value={getInput.phone} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Your Address</label>
                                    <input type="text" name="address" className="form-control" onChange={handleInput} value={getInput.address} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Country</label>
                                    <input type="text" name="country" className="form-control" onChange={handleInput} value={getInput.country} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-flex">Avatar</label>
                                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" className="form-control" onChange={handleInputFile} ref={inputFileRef} />
                                </div>
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100">Update</button>
                                </div>
                            </form>
                            <FormError error={getError} />
                        </div>
                        <div className="col-md-4 p-5 border shadow-sm">
                            <div className="card">
                                <div className="card-body text-center">
                                    <img src={imgSrc} className="img-fluid rounded-circle mb-2" width="128" height="128" alt="Avatar" />
                                    <h5 className="card-title mb-0">{getInput.name}</h5>
                                    <div className="text-muted mb-2">{getInput.email}</div>
                                    <div>
                                        <Link className="btn btn-primary btn-sm" to="" onClick={handlePhotoChangeClick}>Change Photo</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default UpdateUser;