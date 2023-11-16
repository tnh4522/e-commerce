import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function RecentBlog() {
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
        const data = getData.slice(0, 3);
        return (
            data.map((item, index) => {
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
                                <div className="meta-date"><svg width={16} height={16}><use xlinkHref="#calendar" /></svg>{item.createdAt}</div>
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
    };
    return (
        <section id="latest-blog" className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="section-header d-flex align-items-center justify-content-between my-5">
                        <h2 className="section-title">Our Recent Blog</h2>
                        <div className="btn-wrap align-right">
                            <Link to="/blog" className="d-flex align-items-center nav-link">Read All Articles <svg width={24} height={24}><use xlinkHref="#arrow-right" /></svg></Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {fetchBlog()}
                </div>
            </div>
        </section>
    )
}
export default RecentBlog;