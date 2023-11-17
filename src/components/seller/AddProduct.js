import React, { useEffect } from 'react'
import FormError from '../Error/FormError'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import axios from 'axios';
export default function AddProduct() {
    const navigate = useNavigate();
    const [getInput, setGetInput] = React.useState({
        name: '',
        price: '',
        category: '',
        brand: '',
        company: '',
        detail: '',
        status: '',
        sale: ''
    });
    const [getFiles, setFiles] = React.useState([]);
    function handleChangeImage(e) {
        const name = e.target.name;
        const files = e.target.files;
        setFiles(state => {
            return {
                ...state,
                [name]: files
            }
        })
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }
    const [categories, setCategories] = React.useState([])
    const [brands, setBrands] = React.useState([])
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/category')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/brand')
            .then(response => {
                setBrands(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    function fetchCategory() {
        return categories.map((value, index) => {
            return (
                <option key={index} value={value.id}>{value.category}</option>
            )
        })
    };
    function fetchBrand() {
        return brands.map((value, index) => {
            return (
                <option key={index} value={value.id}>{value.brand}</option>
            )
        })
    };
    const [getError, setError] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Name is required!';
            flag = false;
        }
        if (getInput.price === '') {
            errorSubmit.price = 'Price is required!';
            flag = false;
        }
        if (getInput.category === '') {
            errorSubmit.category = 'Category is required!';
            flag = false;
        }
        if (getInput.brand === '') {
            errorSubmit.brand = 'Brand is required!';
            flag = false;
        }
        if (getInput.company === '') {
            errorSubmit.company = 'Company is required!';
            flag = false;
        }
        if (getInput.detail === '') {
            errorSubmit.detail = 'Detail is required!';
            flag = false;
        }
        if (getInput.status === '') {
            errorSubmit.status = 'Status is required!';
            flag = false;
        }
        if (getFiles.length === 0) {
            errorSubmit.files = 'File is required!';
            flag = false;
        }
        else {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (getFiles.files) {
                Object.keys(getFiles.files).forEach((key) => {
                    if (typeFile.indexOf(getFiles.files[key].type) === -1) {
                        errorSubmit.files = 'File is not valid!';
                        flag = false;
                    }
                    else if (getFiles.files[key].size > 1024 * 1024) {
                        errorSubmit.files = 'File is too large!';
                        flag = false;
                    }
                });
                if (Object.keys(getFiles.files).length > 5) {
                    errorSubmit.files = 'Maximun 5 files!';
                    flag = false;
                }
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            let stringArrayImage = [];
            Object.keys(getFiles.files).forEach((key) => {
                stringArrayImage.push(getFiles.files[key].name);
            });
            const idUser = JSON.parse(localStorage.getItem('user')).id;
            console.log(idUser);
            let data = {
                name: getInput.name,
                price: getInput.price,
                idCategory: getInput.category,
                idBrand: getInput.brand,
                idUser: idUser,
                companyProfile: getInput.company,
                detail: getInput.detail,
                status: getInput.status,
                sale: getInput.sale,
                highlight: 0,
                active: 0,
                condition: 0,
                image: JSON.stringify(stringArrayImage)
            }

            axios.post('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/add', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => {
                    navigate('/seller');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    function fetchImage() {
        if (getFiles.files !== undefined) {
            return Object.keys(getFiles.files).map((key, index) => {
                return (
                    <div key={index} style={{ width: '100px', height: '100px', margin: '0px 5px 10px 0px' }}>
                        <img key={index} src={require('../../images/' + getFiles.files[key].name)} alt="" style={{ width: '100px', height: '100px', marginRight: '10px', border: '1px solid #fe980f' }} />
                        <i className="fa fa-times" style={{ position: 'relative', top: '-100px', left: '80px', cursor: 'pointer', color: '#fe980f', fontSize: '20px' }} onClick={() => handleDeleteImage(key)}></i>
                    </div>
                )
            })
        }
    }
    function handleDeleteImage(key) {
        setFiles(state => {
            return {
                ...state,
                files: Object.keys(state.files).reduce((result, value) => {
                    if (value !== key) {
                        result[value] = state.files[value];
                    }
                    return result;
                }, {})
            }
        })
    }
    function showSaleInput() {
        if (getInput.status === '0') {
            return (
                <input className='form-control' type="number" name="sale" placeholder="Sale (%)" onChange={handleChange} required />
            )
        }
    }
    function turnBackButton() {
        navigate('/seller');
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Add Product</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Seller</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className='mb-3'>
                <div className="container-sm">
                    <form className='row g-2 p-3 border shadow-lg justify-content-center needs-validation was-validated' noValidate encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
                        <div className='col-md-4'>
                            <label className="form-label">Product Name</label>
                            <input className='form-control' type="text" name="name" onChange={handleChange} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label className="form-label">Product Price</label>
                            <input className='form-control' type="number" name="price" onChange={handleChange} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label className="form-label">Category</label>
                            <select className="form-select" name='category' onChange={handleChange} required>
                                <option>Categories</option>
                                {fetchCategory()}
                            </select>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label className="form-label">Brand</label>
                            <select className="form-select" name="brand" onChange={handleChange} required>
                                <option>Brand</option>
                                {fetchBrand()}
                            </select>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label className="form-label">Status</label>
                            <select className="form-select" name='status' onChange={handleChange} required>
                                <option>Status</option>
                                <option value="1">New</option>
                                <option value="0">Sale</option>
                            </select>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label className="form-label">Sale</label>
                            {showSaleInput()}
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="form-label">Company</label>
                            <input className='form-control' type="text" name="company" placeholder="Company" onChange={handleChange} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="form-label">Image</label>
                            <input className='form-control' type="file" name='files' onChange={handleChangeImage} accept=".png, .jpg, .jpeg" multiple required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            {fetchImage()}
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label">Detail</label>
                            <textarea className='form-control' name="detail" onChange={handleChange} required></textarea>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <input className='form-control' type="hidden" name="highlight" value='0' />
                        <input className='form-control' type="hidden" name="active" value='0' />
                        <button type="submit" className="btn btn-primary">Add Product</button>
                        <button type="button" className="btn btn-danger" onClick={turnBackButton}>Turn Back</button>
                    </form>
                    <FormError error={getError} />
                </div>
            </section>
        </div>
    )
}