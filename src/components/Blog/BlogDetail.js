import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentBlog from "../HomePage/RecentBlog";
import axios from "axios";
import { fallbackImage, getImageSrc } from "../utils/imageUtils";
function BlogDetail() {
    let { id } = useParams();
    const [getData, setData] = useState('');
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/detail/' + id)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);
    function fetchData() {
        if (getData) {
            const createMarkup = (html) => {
                return { __html: html };
            }
            return (
                <div>
                    <section className="py-5">
                        <div className="container">
                            <div className="mt-5">
                                <div className="post-meta d-flex align-items-center">
                                    <span className="post-category">{getData.createdAt}</span> / <span className="meta-date">{getData.updatedAt}</span>
                                </div>
                                <h1 className="page-title">{getData.title}</h1>
                                <div className="post-meta d-flex align-items-center">
                                    {/* <HalfRating idBlog={id} /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    <div>
                        <div className="container">
                            <div className="row">
                                <main className="post-grid">
                                    <div className="row">
                                        <article className="post-item">
                                            <div className="post-content">
                                                <div className="post-thumbnail mb-5">
                                                    <img
                                                        src={getImageSrc(getData.image)}
                                                        alt="single-post"
                                                        className="img-fluid"
                                                        onError={(e) => { e.currentTarget.src = fallbackImage; }}
                                                    />
                                                </div>
                                                <div className="post-description py-4">
                                                    <p>
                                                        <strong>{getData.description}</strong>
                                                    </p>
                                                </div>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="post-content">
                                                                <div className="post-description py-4">
                                                                    <div dangerouslySetInnerHTML={createMarkup(getData.content)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                        {/* <BasicRating idBlog={id} /> */}
                                        {/* {getCMT()}
                                        <CommentBlog idBlog={id} getCMT={getCMT} idSubComment={getIdReply} /> */}
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                    <RecentBlog />
                </div>
            )
        }
    }
    return (
        <div>
            {fetchData()}
        </div>
    )
}
export default BlogDetail;
