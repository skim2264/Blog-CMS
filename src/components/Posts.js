import React, {useState, useEffect} from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  //fetch all products from API on mount
  useEffect(() => {
    getAllPosts();
  },[]);

  const getAllPosts = async() => {
    const requestOptions = {
      method: 'GET',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
    }
    const response = await fetch("https://blog-api-production-9c1d.up.railway.app/api/posts", requestOptions)
      .then(data => data.json())
      .catch((err) => {
        console.error(err);
      });

    setPosts(response);
  }

  return (
    <div className="posts-div">
      {posts 
        ? posts.map(post => {
          return <Post post={post} key={post._id}></Post>
        })
        : <p>Please login to view posts</p>
      }
    </div>
  )
};

export default Posts;