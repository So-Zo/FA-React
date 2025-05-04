import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import '../../../components/ui/Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="/logo-image.jpg" alt="FanArcs Logo" className="logo-image" />
            <span className="site-name">FanArcs</span>
          </Link>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search..." 
              aria-label="Search"
            />
            <button className="search-button" aria-label="Submit search">
              🔍
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
