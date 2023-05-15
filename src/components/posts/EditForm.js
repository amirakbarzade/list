import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const EditFormPost = ({ post , postId}) => {
const location = useLocation()

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
let postID =post?.id

console.log(location,postId,"postId");
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                body,
                userId: 1,
                id: post.id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setError(null)
                console.log(data)
                Swal.fire({
                    title: "Thanks!",
                    text: "Post update successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            }).catch(err => {
                setLoading(false)
                setError(err.message)
                Swal.fire({
                    title: "Error!",
                    text: err.message,
                    icon: "warning",
                    confirmButtonText: "Ok",
                });
            });
    }

    useEffect(() => {
        setTitle(post.title)
        setBody(post.body)
    }, [post])

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" />
                <div className="form-text text-danger">
                    {title ? '' : 'Title is required'}
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea onChange={(e) => setBody(e.target.value)} value={body} className="form-control" rows="6"></textarea>
                <div className="form-text text-danger">
                    {body ? '' : 'Title is required'}
                </div>
            </div>
            <button className="btn btn-dark" type="submit" disabled={title === '' || body === ''}>
                {/* {loading && <div className="spinner-border spinner-border-sm me-2"></div>} */}
                Edit
            </button>
            {error && <div className="mt-2 fw-bold text-danger">{error}</div>}
        </form>
    )
}

export default EditFormPost;