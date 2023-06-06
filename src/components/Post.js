import React from "react";

const Post = (props) => {
  const {post} = props;

  const created_date = new Date(post.createdAt);
  const created_date_formatted = created_date.toLocaleDateString();

  const updated_date = new Date(post.updatedAt);
  const updated_date_formatted = updated_date.toLocaleDateString();

  return (
    <div className="post-div">
      <p className="post-title">{post.title}</p>
      <div className="post-image-text">
        <img src={post.image} alt="" className="post-image"></img>
        <p className = "post-text">{post.post_text}</p>
      </div>
      <p className="post-timestamp">Created On: {created_date_formatted}</p>
      <p className="post-timestamp">Updated On: {updated_date_formatted}</p>
      <p className="post-author">by {post.author.username}</p>
      <p className="post-comments">{post.comments.length} Comments</p>
    </div>
  )
};

export default Post;