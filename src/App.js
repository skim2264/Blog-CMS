import './App.css';
import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './components/Posts';
import Login from './components/Login';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar';
import Post from './components/Post';
import UpdatePostForm from './components/UpdatePostForm';

function App() {
  const [loggedIn, setLoggedIn] = useState('accessToken' in sessionStorage);
  return (
    <div className="app-div">
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Navbar>
        <Routes>
          <Route path='/' element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route path='/posts' element={<Posts loggedIn={loggedIn}/>}/>
          <Route path='/newPost' element={<PostForm/>}/>
          <Route path='/:postId' element={<Post/>}/>
          <Route path='/updatePost' element={<UpdatePostForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
