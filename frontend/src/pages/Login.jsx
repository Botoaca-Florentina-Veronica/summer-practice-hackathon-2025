import React from "react";
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";
import appleIcon from "../assets/images/apple.png";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Intră în cont</h2>
      <button className="google-btn">
        <img src={googleIcon} alt="Google" className="icon-img" /> Continuă cu
        Google
      </button>
      <button className="facebook-btn">
        <img src={facebookIcon} alt="Facebook" className="icon-img" /> Continuă cu
        Facebook
      </button>
      <button className="apple-btn">
        <img src={appleIcon} alt="Apple" className="icon-img" /> Continuă cu Apple
      </button>
      <div className="separator">SAU</div>
      <input type="email" placeholder="Adresa ta de email" />
      <input type="password" placeholder="Parola" />
      <button className="login-btn">Intră în cont</button>
      <div className="login-footer">
        <a href="#" className="forgot">
          Ai uitat parola?
        </a>
        <a href="#" className="create">
          Creează cont
        </a>
      </div>
    </div>
  );
};

export default Login;
