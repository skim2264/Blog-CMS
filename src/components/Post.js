import React from "react";

const Post = (props) => {
  const {post} = props;

  return (
    <div className="post-div">
      <p>{post.title}</p>
      <p>{post.post_text}</p>
      <p>{post.timestamp}</p>
      <p>{post.author.username}</p>
      <p>{post.comments.length} Comments</p>
    </div>
  )
};

export default Post;