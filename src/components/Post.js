import React from "react";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";

const Post = (props) => {
  let location = useLocation();
  const {post} = location.state || props;
  const params = useParams();
  const navigate = useNavigate();

  const created_date = new Date(post.createdAt);
  const created_date_formatted = created_date.toLocaleDateString();

  const updated_date = new Date(post.updatedAt);
  const updated_date_formatted = updated_date.toLocaleDateString();

  const deletePost = async() => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`},
      body: JSON.stringify(post)
    }
    const req = await fetch(`https://blog-api-production-9c1d.up.railway.app/api/posts/${params.postId}`, requestOptions)
      .then(data => data.json())
      .catch((err) => {
        console.error(err);
      });

    if (req) {
      alert("Post deleted!");
      navigate('/posts');
    }
  }

  return (
    <div className="post-div">
      {location.state
        ? <p className = "post-title">{post.title}</p>
        : <NavLink to={{pathname:'/' + post._id}} state={{post}} key={post._id}><p className="post-link">{post.title}</p></NavLink>
      }

      <div className="post-author-timestamp">
        <p className = "post-author">by {post.author.username}</p>
        <div className="post-timestamp-div">
          <p className = "post-timestamp">Created: {created_date_formatted}</p>
          <p className = "post-timestamp">Last Updated: {updated_date_formatted}</p>
        </div>
      </div>
      
      <p className = "post-text">{post.post_text}</p>

      <p className="post-comments">{post.comments.length} Comments</p>
      
      {location.state 
        ? <div className="post-buttons">
            <NavLink to={{pathname:'/updatePost'}} state={{post}}><button type="button">Update</button></NavLink>
            <button type="button" onClick={deletePost}>Delete</button>
        </div>
        : null
      }
      
    </div>
  )
};

export default Post;