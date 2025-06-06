import React from "react";
import { useNavigate } from "react-router-dom";
import peopleProgramming from '../assets/images/peopleProgramming.png';
import './MainStage.css';

const MainStage = () => {
  const navigate = useNavigate();
  return (
    <div className="mainstage-bg">
      <div className="mainstage-container">
        <div className="mainstage-left">
          <h1>GitGud, locul unde să îți gestionezi toate proiectele!</h1>
          <p className="mainstage-sub">Vorbești cu colegii, primesti feedback si dai sfaturi</p>
          <button className="mainstage-signup" onClick={() => navigate('/login')}>Sign up</button>
        </div>
        <div className="mainstage-right">
          <img src={peopleProgramming} alt="People programming" className="mainstage-image" />
        </div>
      </div>
    </div>
  );
};

export default MainStage;
