import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentBlog from "../HomePage/RecentBlog";
import CommentBlog from "./CommentBlog";
import ListCommentBlog from "./ListCommentBlog";
import HalfRating from "./RatingReadOnly";
import BasicRating from "./Rating";
import axios from "axios";
function BlogDetail() {
    let { id } = useParams();
    const [getData, setData] = useState('');
    const [getComment, setComment] = useState('');
    const [getIdReply, setIdReply] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/api/blog/' + id)
            .then(res => {
                setData(res.data);
                setComment(res.data.comments);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);
    function handleReplyComment(e) {
        setIdReply(e.target.id);
        document.querySelector('.comment-respond textarea').focus();
    }
    function getCMT(data) {
        let listComment = [...getComment];
        if (data) {
            listComment.push(data);
            setComment(listComment);
        }
        return <ListCommentBlog dataComment={listComment} handleReplyComment={handleReplyComment} />
    }
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
                                                    <img src={require('../../images/' + getData.image)} alt="single-post" className="img-fluid" />
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