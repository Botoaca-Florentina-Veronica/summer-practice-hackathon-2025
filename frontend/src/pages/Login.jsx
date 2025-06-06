import React from "react";
import googleIcon from "../assets/images/google-icon.png";
import facebookIcon from "../assets/images/facebook-icon.png";
import appleIcon from "../assets/images/apple-icon.png";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Intră în cont</h2>
      <button className="google-btn">
        <span className="google-icon"></span> Continuă cu Google
      </button>
      <button className="facebook-btn">
        <span className="facebook-icon"></span> Continuă cu Facebook
      </button>
      <button className="apple-btn">
        <span className="apple-icon"></span> Continuă cu Apple
      </button>
      <div className="separator">SAU</div>
      <input type="email" placeholder="Adresa ta de email" />
      <input type="password" placeholder="Parola" />
      <button className="login-btn">Intră în cont</button>
      <div className="login-footer">
        <a href="#" className="forgot">Ai uitat parola?</a>
        <a href="#" className="create">Creează cont</a>
      </div>
    </div>
  );
};

export default Login;
