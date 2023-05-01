import React, {useState} from "react";

const PostForm = () => {
  const [post, setpost] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setpost({...post, [key]: value});
  }

  const submitForm = async(e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
      body: JSON.stringify({text: post})
    }
 
    const response = await fetch(`https://blog-api-production-9c1d.up.railway.app/api/posts/create`, requestOptions)
      .then(response => response.json())
      .catch((err) => {
        setErrors(err);
    })

    if ('title' in response && 'post_text' in response) {
      alert("Post Added");
      window.location.reload(false);
    } else {
      const errArray = response.errors.map(error => {
        return error.msg
      })
      setErrors(errArray);
    }
  }

  return (
    <form className="post-form" onSubmit={submitForm}>
      <label htmlFor="title"></label>
      <input name="title" id="post-title" placeholder="New post" onChange={handleChange}></input>
      <label htmlFor="text"></label>
      <input name="text" id="post-text" placeholder="New post" onChange={handleChange}></input>
      <label htmlFor="isPrivate"></label>
      <input type="checkbox" name="isPrivate" id="post-private" placeholder="New post" onChange={handleChange}></input>
      <button type="submit">Add post</button>

      {errors ? errors.map((error, index) => {
        return <p key={index}>{error}</p>
      }): null}
    </form>
  )
};

export default PostForm;