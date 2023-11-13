import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect } from 'react'
import FormError from "../Error/FormError";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
function UpdateProduct() {
    const navigate = useNavigate();
    const [getInput, setGetInput] = React.useState({});
    function handleChange(e) {
        const { name, value } = e.target;
        setGetInput(state => {
            return {
                ...state,
                [name]: value
            }
        })
    }
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

    let productID = useParams().id;
    const [getImages, setImages] = React.useState([]);
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/detail/' + productID)
            .then(response => {
                setGetInput(response.data)
                setImages(response.data.image);
            })
            .catch(error => {
                console.log(error)
            })
    }, [productID]);
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
        let totalImages = 0;
        if(getFiles.files) {
            totalImages = parseJsonArray(getImages).length + Object.keys(getFiles.files).length - selectedImages.length;
        } else {
            totalImages = getImages.length - selectedImages.length;
        }
        if (totalImages < 5) {
            errorSubmit.files = 'Minimun 5 files!';
            flag = false;
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const idUser = JSON.parse(localStorage.getItem('user')).id;
            let data_json = {
                name: getInput.name,
                price: getInput.price,
                idCategory: getInput.idCategory,
                idBrand: getInput.idBrand,
                idUser: idUser,
                companyProfile: getInput.companyProfile,
                detail: getInput.detail,
                status: getInput.status,
                sale: getInput.sale,
                highlight: 0,
                active: 0,
                condition: 0,
                image: getImages,
            }
            console.log(data_json);
            console.log(selectedImages);

            axios.post('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/update/' + productID, data_json)
                .then(res => {
                    if (res.data.errors) {
                        setError(res.data.errors);
                    }
                    else {
                        navigate('/seller');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    function parseJsonArray(jsonString) {
        try {
            const jsonArray = JSON.parse(jsonString);
            if (Array.isArray(jsonArray)) {
                return jsonArray;
            } else {
                throw new Error("Chuỗi không phải là một mảng JSON hợp lệ.");
            }
        } catch (error) {
            console.error("Lỗi khi phân tích chuỗi JSON:", error.message);
            return null;
        }
    }

    function fetchImages() {
        if (parseJsonArray(getImages)) {
            return parseJsonArray(getImages).map((value, index) => {
                return (
                    <div className="form-check d-flex flex-wrap justify-content-center" key={index} style={{ width: '100px', height: '100px', margin: '0px 5px 10px 0px' }}>
                        <img key={index} src={require('../../images/' + extractFilename(value))} alt="" style={{ width: '100px', height: '100px', marginRight: '10px', border: '1px solid #fe980f' }} />
                        <input type="checkbox" className='form-check-input' name="deleteImage" value={value} onChange={(e) => handleDeleteImageCheckBox(e, value)} />
                    </div>
                )
            })
        }
    }
    function extractFilename(inputString) {
        const parts = inputString.split('_');
        if (parts.length === 2) {
            return parts[1];
        } else {
            return inputString;
        }
    }
    const [selectedImages, setSelectedImages] = React.useState([]);
    function handleDeleteImageCheckBox(e, imageFileName) {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, imageFileName]);
        } else {
            setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((fileName) => fileName !== imageFileName));
        }
    }
    function showSaleInput() {
        if (getInput.status === 1) {
            return (
                <div className="col-md-4">
                    <label className="form-label">Sale</label>
                    <input type="number" name="sale" className='form-control' placeholder="Sale (%)" onChange={handleChange} value={getInput.sale} required />
                </div>
            )
        }
    }
    function fetchCategory() {
        return categories.map((value, index) => {
            return (
                value.id === getInput.idCategory ? <option key={index} value={value.id} selected>{value.category}</option> : <option key={index} value={value.id}>{value.category}</option>
            )
        })
    };
    function fetchBrand() {
        return brands.map((value, index) => {
            return (
                value.id === getInput.idBrand ? <option key={index} value={value.id} selected>{value.brand}</option> : <option key={index} value={value.id}>{value.brand}</option>
            )
        })
    };
    function fetchStatus() {
        const isSelected = getInput.status === 0;
        return (
            <select className="form-select" name='status' onChange={handleChange} required>
                <option value="0" selected={isSelected}>New</option>
                <option value="1" selected={!isSelected}>Sale</option>
            </select>
        );
    }
    function turnBackButton() {
        navigate('/seller');
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Update Product</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Admin</Link>
                            <span className="breadcrumb-item active" aria-current="page">User</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="mb-3">
                <div className="container-sm">
                    <form className="row g-3 p-3 border shadow-sm justify-content-start needs-validation was-validated" method='post' onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                        <div className="col-md-4">
                            <label className="form-label">Product Name</label>
                            <input type="text" name="name" className="form-control" onChange={handleChange} value={getInput.name} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Price</label>
                            <input type="number" name="price" className="form-control" onChange={handleChange} value={getInput.price} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Category</label>
                            <select className="form-select" name="category" onChange={handleChange} required>
                                {fetchCategory()}
                            </select>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Brand</label>
                            <select className="form-select" name="brand" onChange={handleChange} required>
                                {fetchBrand()}
                            </select>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-md-4" >
                            <label className="form-label">Status</label>
                            {fetchStatus()}
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        {showSaleInput()}
                        <div className="col-md-6">
                            <label className="form-label">Company</label>
                            <input type="text" name="company" className="form-control" onChange={handleChange} value={getInput.companyProfile} required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Image</label>
                            <input type="file" name="files" className="form-control" onChange={handleChangeImage} accept=".png, .jpg, .jpeg" multiple />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Choice Delete Image</label>
                            <div className="form-check d-flex flex-wrap justify-content-center">
                                {fetchImages()}
                            </div>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Detail</label>
                            <textarea name="detail" className="form-control" onChange={handleChange} value={getInput.detail} required></textarea>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Product</button>
                        <button type="button" className="btn btn-danger" onClick={turnBackButton}>Turn Back</button>
                    </form>
                    <FormError error={getError} />
                </div>
            </section>
        </div>
    )
}
export default UpdateProduct;