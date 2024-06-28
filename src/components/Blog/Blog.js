import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jarallax } from "jarallax";
import 'jarallax/dist/jarallax.min.css';
import ShopPagination from "../shop/ShopPagination";
import { Spin } from 'antd';
// import HalfRating from "./RatingReadOnly";
// import axios from "axios";

const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
function Blog() {
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.2,
    });
    const [getData, setData] = useState([]);
    const [record, setRecord] = useState([]);
    const [countData, setCountData] = useState(0);
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(false);

    const endpointUrl = 'https://query.wikidata.org/sparql';

    // function makeSPARQLQuery() {
    //     const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
    //     const headers = { 'Accept': 'application/sparql-results+json' };
    //     fetch(fullUrl, { headers }).then(body => body.json()).then(json => console.log(json));
    // }

    useEffect(() => {
        const sparqlQuery = "SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel\n" +
            "WHERE\n" +
            "{\n" +
            "  ?country wdt:P31 wd:Q3624078 .\n" +
            "  #not a former country\n" +
            "  FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}\n" +
            "  #and no an ancient civilisation (needed to exclude ancient Egypt)\n" +
            "  FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}\n" +
            "  OPTIONAL { ?country wdt:P36 ?capital } .\n" +
            "\n" +
            "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE],en\" }\n" +
            "}\n" +
            "ORDER BY ?countryLabel";
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };

        fetch(fullUrl, { headers }).then(body => body.json()).then(json => { console.log(json); setCountry(json.results.bindings); });
    }, []);

    useEffect(() => {
        // axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/list')
        //     .then(res => {
        //         setData(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        const sparqlQuery = "#defaultView:ImageGrid\n" +
            "SELECT ?item ?itemLabel ?_image ?itemDescription ?country ?countryLabel\n" +
            "WHERE\n" +
            "{\n" +
            "  ?item wdt:P31 wd:Q2095. # Đối tượng là một món ăn\n" +
            "  OPTIONAL { ?item wdt:P18 ?_image. } # Lấy ảnh nếu có\n" +
            "  OPTIONAL { ?item wdt:P495 ?country. } # Lấy quốc gia của món ăn\n" +
            "  SERVICE wikibase:label { bd:serviceParam wikibase:language \"en\". }\n" +
            "}\n" +
            "LIMIT 1000\n" +
            "";
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
        const headers = { 'Accept': 'application/sparql-results+json' };
        let count = 0;
        fetch(fullUrl, { headers }).then(body => body.json()).then(json => {
            setData(json.results.bindings);
            setRecord(json.results.bindings.filter(value => {
                if (value._image && value.countryLabel && value.itemLabel && value.itemDescription && value.item) {
                    count++;
                    return value;
                }
            }));
            setCountData(count);
            setLoading(true);
        });

    }, []);

    function fetchCountry() {
        if (country.length > 0) {
            return (
                country.map((item, index) => {
                    return (
                        <option key={index} value={item.countryLabel.value}>{item.countryLabel.value}</option>
                    )
                })
            )
        }
    }
    function fetchData(data) {
        if (data.length > 0) {
            return (
                data.map((item, index) => {
                    if (item._image && item.itemDescription && item.countryLabel && item.itemLabel && item.item) {
                        return (
                            <div className="col-md-4" key={index} style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', paddingBottom: '1rem' }}>
                                <article className="post-item card border-0 shadow-sm p-3">
                                    <div className="image-holder zoom-effect">
                                        <Link to={item.item.value} target="_blank">
                                            <img src={item._image ? item._image.value : ''} alt="post" className="card-img-top" style={{ 'objectFit': 'cover', height: '300px' }} />
                                        </Link>
                                    </div>
                                    <div className="card-body" >
                                        <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                            <div className="meta-date" >{item.countryLabel.value}</div>
                                            <div className="meta-categories">
                                                {/* <HalfRating idBlog={item.id} /> */}
                                            </div>
                                        </div>
                                        <div className="post-header"  >
                                            <h3 className="post-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                <Link to={item.item.value} target="_blank" className="text-decoration-none" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.itemLabel.value}</Link>
                                            </h3>
                                            <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.itemDescription.value}</p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )
                    }
                })
            )
        }
    };

    function sortData(e) {
        let count = 0;
        if (e.target && e.target.value !== undefined) {
            let countryName = e.target.value;
            setRecord(getData.filter(value => {
                if (value._image && value.countryLabel && value.itemLabel && value.itemDescription && value.item) {
                    if (value.countryLabel.value.toLowerCase().includes(countryName.toLowerCase())) {
                        count++;
                        return value.countryLabel.value.toLowerCase().includes(countryName.toLowerCase());
                    }
                    if (countryName === 'default') {
                        count++;
                        return value;
                    }
                }
            }
            ));
        }
        setCountData(count);
    };

    return (
        <div>
            <section className="jarallax py-5">
                <img src={require('../../images/banner-image-2.jpg')} className="jarallax-img" alt='' />
                <div className="hero-content py-5 my-5">
                    <div className="container-fluid">
                        <nav className="breadcrumb text-white">
                            <Link className="breadcrumb-item nav-link" to="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Blog</span>
                        </nav>
                        <h1 className="display-1 text-white">Food Blog</h1>
                    </div>
                </div>
            </section>
            <div className="py-5">
                {loading ?
                    (
                        <div className="container-fluid">
                            <div className="filter-shop d-flex justify-content-between">
                                <div className="showing-product">
                                    <p>Showing <span className="text-primary">{countData}</span> results</p>
                                </div>
                                <div className="sort-by">
                                    <select id="input-sort" name="sort" className="form-control" data-filter-sort data-filter-order onChange={sortData} style={{ 'border': '1px solid #ffc43f' }} >
                                        <option value='default'> -- Select Country -- </option>
                                        {fetchCountry()}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <ShopPagination products={record} renderProducts={fetchData} />
                            </div>
                        </div>
                    ) :
                    (
                        <Spin tip="Loading" size="large">
                            {content}
                        </Spin>
                    )
                }
            </div>
        </div>
    )
}
export default Blog;