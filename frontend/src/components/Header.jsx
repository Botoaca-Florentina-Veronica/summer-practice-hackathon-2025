import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      {/* ...alte elemente de header... */}
      <div className="profile-section">
        <AccountCircleIcon
          className="profile-icon"
          fontSize="large"
          onClick={() => navigate('/login')}
        />
      </div>
    </header>
  );
};

export default Header;
