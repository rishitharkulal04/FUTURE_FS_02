import React from 'react';
import { FiHome, FiUserPlus, FiUsers } from 'react-icons/fi';
import '../styles/sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', path: '/' },
    { icon: <FiUserPlus />, label: 'Add Customer', path: '/add-customer' },
    { icon: <FiUsers />, label: 'Customer List', path: '/customers' },
  ];

  const handleNavigation = (path) => {
    window.location.hash = path;
  };

  const currentPath = window.location.hash.replace('#', '') || '/';

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C</div>
            {isOpen && <span className="logo-text">CRM</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-version">
            {isOpen && <span>v1.0.0</span>}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;