import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect, useRef } from "react";
import { notification, Card } from 'antd';
import { useState } from "react";
import FormError from "../Error/FormError";
import API from "../API/API";

function MyAccount() {
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

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            description: type === 'success' ? 'Update successfully!' : 'Update failed!',
        });
    };

    const inputFileRef = useRef(null);
    const handlePhotoChangeClick = (event) => {
        event.preventDefault();
        inputFileRef.current.click();
    };

    useEffect(() => {
        let getUserData = JSON.parse(localStorage.getItem('user'));
        if (getUserData) {
            setInput((state) => {
                return {
                    ...state,
                    id: getUserData.id,
                    name: getUserData.name,
                    email: getUserData.email,
                    phone: getUserData.phone,
                    address: getUserData.address,
                    country: getUserData.country,
                    avatar: getUserData.avatar
                }
            });
        }
    }, []);

    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Name is required!';
            flag = false;
        }
        if (getInput.email === '') {
            errorSubmit.email = 'Email is required!';
            flag = false;
        }
        if (getInput.phone === '') {
            errorSubmit.phone = 'Phone is required!';
            flag = false;
        }
        if (getInput.address === '') {
            errorSubmit.address = 'Address is required!';
            flag = false;
        }
        if (getInput.country === '') {
            errorSubmit.country = 'Country is required!';
            flag = false;
        }
        const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
        if (getInput.file && typeFile.indexOf(getInput.file.type) === -1) {
            errorSubmit.avatar = 'Avatar is not valid!';
            flag = false;
        }
        // if (getInput.file && getInput.file.size > 1024 * 1024) {
        //     errorSubmit.avatar = 'Avatar is too large!';
        //     flag = false;
        // }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password === '' ? null : getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                country: getInput.country,
                avatar: getInput.file ? getInput.file.name : null
            }

            API.post('user/update/' + getInput.id, formData)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    openNotificationWithIcon('success');
                })
                .catch(err => {
                    errorSubmit.email = "Something went wrong!";
                    setError(errorSubmit);
                    openNotificationWithIcon('error');
                });
        }
    };

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
            {contextHolder}
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">My Account</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">My Account</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 p-5 border shadow-sm">
                            <h5 className="text-uppercase mb-4">Update My Profile</h5>
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
                                    <label className="d-flex">New Password</label>
                                    <input type="password" name="password" className="form-control" onChange={handleInput} placeholder='Enter new password' />
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
                                    <input type="file" name="avatar" style={{ display: 'none' }} className="form-control" onChange={handleInputFile} ref={inputFileRef} />
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
                            <Card type="inner" style={{ marginTop: 16 }} title="Delivery Address" >
                                <p>Address: {getInput.address}</p>
                                <p>Country: {getInput.country}</p>
                                <p>Phone: {getInput.phone}</p>
                                <p>Email: {getInput.email}</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MyAccount;