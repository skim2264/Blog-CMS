import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const {loggedIn, setLoggedIn} = props;

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setLoggedIn(false);
    window.location.reload(false);
  }

  return (
    <nav className="navbar">
      {(loggedIn)
        ?<div>
          <NavLink to="/posts">View Posts</NavLink>
          <NavLink to="/newPost">Create New Post</NavLink>
          <button id="logoutButton" onClick={logout}>Logout</button>
        </div>
        :null
      }
    </nav>
  )
};

export default Navbar;