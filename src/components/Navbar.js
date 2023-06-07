import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const {loggedIn, setLoggedIn} = props;

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/');
    window.location.reload(false);
  }

  return (
    <nav className="navbar">
      {(loggedIn)
        ? <div className="navbar-div">
            <NavLink to="/posts" className="nav-link">View Posts</NavLink>
            <NavLink to="/newPost" className="nav-link">Create New Post</NavLink>
            <button id="logoutButton" onClick={logout} className="nav-link">Logout</button>
          </div>
        :null
      }
    </nav>
  )
};

export default Navbar;