import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [post, setPost] = useState({});
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setPost({...post, [key]: value});
  }

  const submitForm = async(e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`},
      body: JSON.stringify(post)
    }
 
    const req = await fetch(`https://blog-api-production-9c1d.up.railway.app/api/posts/create`, requestOptions)
      .then(response => response.json())
      .catch((err) => {
        setErrors(err);
    })

    if (req && 'title' in req && 'post_text' in req) {
      alert("Post Added");
      navigate("/posts");
    } else {
      const errArray = req.errors.map(error => {
        return error.msg
      })
      setErrors(errArray);
    }
  }

  return (
    <form className="post-form" onSubmit={submitForm}>
      <label htmlFor="title">Post Title:</label>
      <input name="title" id="post-title" placeholder="Title..." onChange={handleChange}></input>

      <label htmlFor="post_text">Post:</label>
      <textarea name="post_text" id="post-text" placeholder="Post text..." onChange={handleChange}></textarea>

      <div className="form-private">
        <label htmlFor="isPrivate">Keep Post Private: </label>
        <input type="checkbox" name="isPrivate" id="post-private" value="true" placeholder="New post" onChange={handleChange}></input>
      </div>
      <button type="submit">Add post</button>

      {(errors.length > 0) ? errors.map((error, index) => {
        return <p key={index}>{error}</p>
      }): null}
    </form>
  )
};

export default PostForm;