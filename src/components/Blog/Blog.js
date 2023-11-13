import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jarallax } from "jarallax";
import 'jarallax/dist/jarallax.min.css';
import HalfRating from "./RatingReadOnly";
import axios from "axios";
function Blog() {
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.2,
    });
    const [getData, setData] = useState([]);
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/list')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    function fetchBlog() {
        return (
            getData.map((item, index) => {
                return (
                    <div className="col-md-4" key={index} style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', paddingBottom: '1rem' }}>
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <Link to={"/blog/detail/" + item.id}>
                                    <img src={require('../../images/' + item.image)} alt="post" className="card-img-top" />
                                </Link>
                            </div>
                            <div className="card-body" >
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date" >{item.createdAt}</div>
                                    {/* <div className="meta-categories"><HalfRating idBlog={item.id} /></div> */}
                                </div>
                                <div className="post-header"  >
                                    <h3 className="post-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        <Link to={"/blog/detail/" + item.id} className="text-decoration-none">{item.title}</Link>
                                    </h3>
                                    <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                )
            })
        )
    }
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
                        <h1 className="display-1 text-white">Our Blog</h1>
                    </div>
                </div>
            </section>
            <div className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        {fetchBlog()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Blog;