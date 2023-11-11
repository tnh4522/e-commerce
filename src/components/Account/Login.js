import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState } from "react";
import FormError from "../Error/FormError";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {

    const [getInput, setInput] = useState({
        email: '',
        password: ''
    });
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(getInput.email === '') {
            errorSubmit.email = 'Email is required!';
            flag = false;
        }
        if(getInput.password === '') {
            errorSubmit.password = 'Password is required!';
            flag = false;
        }
        if(flag === false) {
            setError(errorSubmit);
        } else {
            setError('');
            axios.post('http://localhost:8080/api/user/login', getInput)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/');
                })
                .catch(err => {
                    errorSubmit.email = 'Email or password is not correct!';
                    setError(errorSubmit);
                })
        }
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Login</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Login</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 p-5 border shadow-sm">
                            <h5 className="text-uppercase mb-4">Login</h5>
                            <form id="form" className="form-group flex-wrap" onSubmit={handleSubmit} method="post">
                                <div className="col-12 pb-3">
                                    <label className="d-none">Username or email address *</label>
                                    <input className="form-control" type="email" placeholder="Enter Your Email" name="email" value={getInput.email} onChange={handleInput} required autoComplete="email" autoFocus aria-describedby="emailHelp"/>
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="d-none">Password *</label>
                                    <input className="form-control" type="password" placeholder="Enter Your Password" name="password" value={getInput.password} onChange={handleInput} required  />
                                </div>
                                <FormError error={getError} />
                                <div className="col-12 pb-3">
                                    <label>
                                        <input type="checkbox" />
                                        <span className="label-body"> Remember me</span>
                                    </label>
                                </div>
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100">Log in</button>
                                    <p>You don't have an account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;