import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function SellerPage() {
    const [getData, setData] = useState([]);
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/list')
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
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
    function fetchCategory(category_id) {
        const category = categories.find(category => category.id === category_id);
        if (category) {
            return category.category;
        }
    }
    function fetchBrand(brand_id) {
        const brand = brands.find(brand => brand.id === brand_id);
        if (brand) {
            return brand.brand;
        }
    };
    function extractFilenames(inputString) {
        try {
            const inputArray = JSON.parse(inputString);
            const resultArray = [];
            for (let i = 0; i < inputArray.length; i++) {
                const filename = inputArray[i];
                const startIndex = filename.indexOf("_") + 1;
                const newFilename = filename.slice(startIndex);
                resultArray.push(newFilename);
            }
            return resultArray;
        } catch (error) {
            console.error("Invalid input JSON string.");
            return [];
        }
    }
    function renderData() {
        return getData.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td><img src={require('../../images/' + extractFilenames(value.image)[0])} alt="" width="70px" /></td>
                    <td>{value.name}</td>
                    <td>{fetchCategory(value.idCategory)}</td>
                    <td>{fetchBrand(value.idBrand)}</td>
                    <td>{value.companyProfile}</td>
                    <td>{value.price}</td>
                    <td>{value.status}</td>
                    <td><Link to={'/seller/update/' + value.id}><button type="button" className="btn btn-primary">Update</button></Link></td>
                    <td><button id={value.id} type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button></td>
                </tr>
            )
        })
    }
    function deleteProduct(e) {
        const id = e.target.id;
        axios.delete(`https://intense-inlet-71668-b76c23b36694.herokuapp.com/${id}`)
        .then(function (response) {
            if (response.status === 200) {
                e.target.parentNode.parentNode.remove();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Seller Page</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Seller</span>
                        </nav>
                    </div>
                </div>
            </section>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope='col'>Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope='col'>Brand</th>
                        <th scope="col">Company</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {renderData()}
                </tbody>
            </table>
        </div>
    )
}
export default SellerPage;