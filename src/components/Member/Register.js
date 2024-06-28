import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React from "react";
import { useState } from "react";
import FormError from "../Error/FormError";
import { useNavigate } from "react-router-dom";
import API from '../API/API';

function Register() {
    const [getInput, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    });
    const navigate = useNavigate();
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
        if (getInput.password === '') {
            errorSubmit.password = 'Password is required!';
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
        if (getInput.avatar === '') {
            errorSubmit.avatar = 'Avatar is required!';
            flag = false;
        } else {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (typeFile.indexOf(getInput.file.type) === -1) {
                errorSubmit.avatar = 'Avatar is not valid!';
                flag = false;
            }
            else if (getInput.file.size > 1024 * 1024) {
                errorSubmit.avatar = 'Avatar is too large!';
                flag = false;
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                avatar: getInput.file ? getInput.file.name : '',
                level: getInput.level
            }
            API.post('user/register', formData)
                .then(res => {
                    navigate('/login');
                    alert('Register success!');
                })
                .catch(err => {
                    errorSubmit.email = err.response.data.message;
                    setError(errorSubmit);
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
    }
    
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Register</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Register</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 p-5 border shadow-sm">
                            <h5 className="text-uppercase mb-4">Register</h5>
                            <form id="form" className="form-group flex-wrap" method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Full Name *</label>
                                    <input type="text" name="name" placeholder="Full Name" className="form-control" onChange={handleInput} required autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Email address *</label>
                                    <input type="email" name="email" placeholder="Email" className="form-control" aria-describedby="emailHelp" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Password *</label>
                                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Phone *</label>
                                    <input type="text" name="address" placeholder="Address" className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Adress *</label>
                                    <input type="text" name="phone" placeholder="Phone" className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Avatar *</label>
                                    <input type="file" name="avatar" placeholder="Avatar" className="form-control" onChange={handleInputFile} required />
                                </div>
                                <input type="hidden" placeholder="Enter Your Level" name="level" onChange={handleInput} />
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100">Register</button>
                                </div>
                            </form>
                            <FormError error={getError} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Register;