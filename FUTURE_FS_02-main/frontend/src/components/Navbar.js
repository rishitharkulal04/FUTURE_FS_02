import React from 'react';
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import '../styles/navbar.css';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="navbar-title">
          <h1>Customer Management</h1>
          <span className="subtitle">Manage your customers efficiently</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-btn">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-section">
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Administrator</span>
          </div>
          <div className="profile-avatar">A</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;