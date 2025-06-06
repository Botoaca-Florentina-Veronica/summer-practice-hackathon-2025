import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../assets/images/white-logo.png';
import './Header.css';
import { useAuth } from '../api/auth.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Închide meniul dacă dai click în afara lui
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const handleNewProject = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/new-project');
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowMenu((v) => !v);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  const handleMyProjects = () => {
    setShowMenu(false);
    navigate('/projects');
  };

  return (
    <header className="header">
      <div className="logo-section">
        <button className="logo-btn" onClick={() => navigate('/') }>
          <img src={logo} alt="Logo" className="header-logo" />
        </button>
      </div>
      <div className="header-actions">
        <button className="new-project-btn" onClick={handleNewProject}>
          <AddIcon className="new-project-icon" />
          <ArrowDropDownIcon className="dropdown-icon" />
          <span className="new-project-text">New Project</span>
        </button>
        <div className="profile-section" style={{ position: 'relative' }}>
          <AccountCircleIcon
            className="profile-icon"
            fontSize="large"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
          {user && showMenu && (
            <div ref={menuRef} style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderRadius: 8,
              zIndex: 100,
              minWidth: 160,
              padding: 0
            }}>
              <button style={{
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: 16,
                cursor: 'pointer',
                color: '#222',
                borderRadius: 8
              }} onClick={handleMyProjects}>
                My Projects
              </button>
              <button style={{
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: 16,
                cursor: 'pointer',
                color: '#222',
                borderRadius: 8
              }} onClick={handleLogout}>
                Deconectează-te
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
