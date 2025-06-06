import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googleIcon from "../assets/images/google.png";
import facebookIcon from "../assets/images/facebook.png";
import appleIcon from "../assets/images/apple.png";
import "./Login.css";
import { useAuth } from '../api/auth.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email,
        password,
      });
      login(response.data.token); // Salvează tokenul și setează userul ca autentificat
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Autentificare eșuată");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Intră în cont</h2>
      <button className="google-btn">
        <img src={googleIcon} alt="Google" className="icon-img" /> Continuă cu Google
      </button>
      <button className="facebook-btn">
        <img src={facebookIcon} alt="Facebook" className="icon-img" /> Continuă cu Facebook
      </button>
      <button className="apple-btn">
        <img src={appleIcon} alt="Apple" className="icon-img" /> Continuă cu Apple
      </button>
      <div className="separator">SAU</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adresa ta de email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Se conectează..." : "Intră în cont"}
        </button>
        {error && <div className="error-message" style={{ color: '#ff4444', marginTop: 8 }}>{error}</div>}
      </form>
      <div className="login-footer">
        <a href="#" className="forgot">
          Ai uitat parola?
        </a>
        <a className="create" onClick={() => navigate('/sign-up')} style={{ cursor: 'pointer' }}>
          Creează cont
        </a>
      </div>
    </div>
  );
};

export default Login;