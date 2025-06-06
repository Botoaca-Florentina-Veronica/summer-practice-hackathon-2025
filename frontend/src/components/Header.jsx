import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../assets/images/white-logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-section">
        <button className="logo-btn" onClick={() => navigate('/') }>
          <img src={logo} alt="Logo" className="header-logo" />
        </button>
      </div>
      <div className="header-actions">
        <button className="new-project-btn" onClick={() => navigate('/new-project')}>
          <AddIcon className="new-project-icon" />
          <ArrowDropDownIcon className="dropdown-icon" />
          <span className="new-project-text">New Project</span>
        </button>
        <div className="profile-section">
          <AccountCircleIcon
            className="profile-icon"
            fontSize="large"
            onClick={() => navigate('/login')}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
