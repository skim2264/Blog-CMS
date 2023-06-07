import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdatePostForm = () => {
  const location = useLocation();
  const post = location.state.post;
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState(post);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setNewPost({...post, [key]: value});
  }

  const updatePost = async(e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`},
        body: JSON.stringify(newPost)
    }
    const req = await fetch(`https://blog-api-production-9c1d.up.railway.app/api/posts/${post._id}`, requestOptions)
      .then(data => data.json())
      .catch((err) => {
        setErrors(err);
      });

    if (req) {
      alert("Post updated!");
      navigate('/posts');
    }
  }

  return (
    <form className="post-form" onSubmit={updatePost}>
      <label htmlFor="title">Post Title:</label>
      <input name="title" id="post-title" placeholder="Title..." onChange={handleChange} value={newPost.title}></input>

      <label htmlFor="post_text">Post:</label>
      <textarea name="post_text" id="post-text" placeholder="Post text..." onChange={handleChange} value={newPost.post_text}></textarea>

      <div className="form-private">
        <label htmlFor="isPrivate">Keep Post Private: </label>
        <input type="checkbox" name="isPrivate" id="post-private" checked={post.isPrivate ? 'checked' : ''} value="true" placeholder="New post" onChange={handleChange}></input>
      </div>
      <button type="submit">Update post</button>

      {(errors.length > 0) ? errors.map((error, index) => {
        return <p key={index}>{error}</p>
      }): null}
    </form>
  )
};

export default UpdatePostForm;