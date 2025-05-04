import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../../components/ui/Navigation.css';

// Navigation component that provides links to all main sections
const Navigation: React.FC = () => {
  // State to track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="main-navigation">
      <div className="container nav-container">
        {/* Mobile menu toggle button */}
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? 'menu-open' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/anime" className={({ isActive }) => isActive ? 'active' : ''}>
              Anime 🌸
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/comics" className={({ isActive }) => isActive ? 'active' : ''}>
              Comics 💥
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/manga" className={({ isActive }) => isActive ? 'active' : ''}>
              Manga 📖
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/tv" className={({ isActive }) => isActive ? 'active' : ''}>
              Television 📺
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/video-games" className={({ isActive }) => isActive ? 'active' : ''}>
              Video Games 🎮
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/worlds-universes" className={({ isActive }) => isActive ? 'active' : ''}>
              Worlds & Universes 🌌
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/power-room" className={({ isActive }) => isActive ? 'active' : ''}>
              Power Room ⚔️
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/community" className={({ isActive }) => isActive ? 'active' : ''}>
              Community 👥
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
              Profile 👤
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
