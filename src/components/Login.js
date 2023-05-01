import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();

  const {setLoggedIn} = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 
        Accept: "application/json",
        'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    }
    const response = await fetch("https://blog-api-production-9c1d.up.railway.app/api/users/login", requestOptions)
      .then(data => data.json())
      .catch((err) => {
        console.log(err);
        return setError(err);
      });

    if ('token' in response && response.user.username==="admin123") {
      //alert successful and redirect 
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert("Logged in successfully!");
      setLoggedIn(true);
      navigate('/posts');
    } else if (response.user.username !== "admin123") {
      alert("Must be admin user");
    } else {
      setError(response.message);
    }
  }

  return (
    <div className="login-div">
      <form className="login-form" onSubmit={loginSubmit}>
        <label htmlFor="username">Username: </label>
        <input name="username" placeholder="username" onChange={handleUsernameChange} value={username}></input>
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" placeholder="password" onChange={handlePasswordChange} value={password}></input>
        <button type="submit" >Login</button>
      </form>
      {error ? <p>{error}</p>: null}
    </div>
  )
};

export default Login;