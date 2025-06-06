import React from "react";
import peopleProgramming from '../assets/images/peopleProgramming.png';
import './MainStage.css';

const MainStage = () => {
  return (
    <div className="mainstage-bg">
      <div className="mainstage-container">
        <div className="mainstage-left">
          <h1>GitGud, locul unde să îți gestionezi toate proiectele!</h1>
          <p className="mainstage-sub"></p>
          <button className="mainstage-signup">Sign up</button>
        </div>
        <div className="mainstage-right">
          <img src={peopleProgramming} alt="People programming" className="mainstage-image" />
        </div>
      </div>
    </div>
  );
};

export default MainStage;
