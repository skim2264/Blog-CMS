import './App.css';
import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './components/Posts';
import Login from './components/Login';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app-div">
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Navbar>
        <Routes>
          <Route path='/' element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/newPost' element={<PostForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
