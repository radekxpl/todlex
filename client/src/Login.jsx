import React, { useState } from "react";
import Axios from "axios";
import MainPage from "./MainPage";
import logo from "./logo-reverse.svg"

export const Login = (props) => {
  const [emailReg, setEmailReg] = useState("");
  const [passReg, setPassReg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");

  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/login', {
      email: emailReg,
      password: passReg
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setUserInfo(response.data); // This line sets the user information
        setIsLoggedIn(true);
      }
    })
  };

  if (isLoggedIn) {
    return <MainPage userInfo={userInfo}/>;
  }

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <img src={logo}></img>
        <label htmlFor="email"><p>E-mail</p>
        <input
          value={emailReg}
          onChange={(e) => setEmailReg(e.target.value)}
          type="email"
          placeholder="jankowalski@gmail.com"
          id="email"
          name="email"
        ></input>
        </label>
        
        <label htmlFor="password"><p>Hasło</p>
        <input
          value={passReg}
          onChange={(e) => setPassReg(e.target.value)}
          type="password"
          id="password"
          name="password"
        ></input>
        </label>
        
        <input type="submit" value="Zaloguj się"></input>
        <button className="form-switch" onClick={() => props.onFormSwitch('register')}>Nie masz konta? Zarejestruj się.</button>
      </form>
      
      {loginStatus && <div>{loginStatus}</div>}
    </div>
  );
};