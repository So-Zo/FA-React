import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/BottomNavigation.css';
import {
  FaHome,
  FaUsers,
  FaUser,
  FaSearch,
  FaBars,
  FaChevronRight,
  FaSeedling,
  FaBolt,
  FaBook,
  FaTv,
  FaGamepad,
  FaGlobe,
  FaInfoCircle,
  FaQuestionCircle,
  FaDownload
} from 'react-icons/fa';

const BottomNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset dropdowns when closing the menu
    if (isMenuOpen) {
      setCategoriesExpanded(false);
      setInfoExpanded(false);
    }
  };

  // Function to handle clicks outside the navigation menu to close it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the navigation menu
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.main-navigation') && !target.closest('.hamburger-menu-icon')) {
        setIsMenuOpen(false);
        setCategoriesExpanded(false);
        setInfoExpanded(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleCategoriesDropdown = () => {
    setCategoriesExpanded(!categoriesExpanded);
    // Close other dropdown when opening this one
    if (!categoriesExpanded) {
      setInfoExpanded(false);
    }
  };

  const toggleInfoDropdown = () => {
    setInfoExpanded(!infoExpanded);
    // Close other dropdown when opening this one
    if (!infoExpanded) {
      setCategoriesExpanded(false);
    }
  };

  return (
    <>
      {/* Bottom navigation bar */}
      <div className="bottom-navigation">
        <Link to="/" className="nav-home-button" aria-label="Go Home">
          <FaHome />
        </Link>
        <Link to="/community" className="nav-social-button" aria-label="Go to Community">
          <FaUsers />
        </Link>
        <Link to="/profile" className="nav-profile-button" aria-label="Profile Page">
          <FaUser />
        </Link>
        <div className="nav-search-popup" onClick={() => console.log('Toggle search popup')}>
          <FaSearch />
        </div>

        <div
          className={`hamburger-menu-icon ${isMenuOpen ? 'active' : ''}`}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <FaBars />
        </div>
      </div>

      {/* The navigation menu that will show/hide */}
      <nav className={`main-navigation ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          {/* Categories dropdown */}
          <li>
            <button
              className="nav-dropdown-toggle"
              aria-expanded={categoriesExpanded}
              aria-controls="categories-dropdown"
              onClick={toggleCategoriesDropdown}
            >
              Categories <span><FaChevronRight /></span>
            </button>
            <ul
              className={`nav-dropdown-menu ${categoriesExpanded ? 'expanded' : ''}`}
              id="categories-dropdown"
            >
              <li><Link to="/anime" className="default-links">Anime <FaSeedling className="icon" /></Link></li>
              <hr />
              <li><Link to="/comics" className="default-links">Comics <FaBolt className="icon" /></Link></li>
              <hr />
              <li><Link to="/manga" className="default-links">Manga <FaBook className="icon" /></Link></li>
              <hr />
              <li><Link to="/tv" className="default-links">Television <FaTv className="icon" /></Link></li>
              <hr />
              <li><Link to="/video-games" className="default-links">Video Games <FaGamepad className="icon" /></Link></li>
              <hr />
              <li>
                <Link to="/worlds-universes" className="default-links">Worlds & Universes <FaGlobe className="icon" /></Link>
              </li>
              <hr />
              <li>
                <Link to="/worlds-universes/directory" className="default-links">Worlds Directory <FaGlobe className="icon" /></Link>
              </li>
            </ul>
          </li>

          {/* FanArcs Info dropdown */}
          <li>
            <button
              className="nav-dropdown-toggle"
              aria-expanded={infoExpanded}
              aria-controls="info-dropdown"
              onClick={toggleInfoDropdown}
            >
              FanArcs Info <span><FaChevronRight /></span>
            </button>
            <ul
              className={`nav-dropdown-menu ${infoExpanded ? 'expanded' : ''}`}
              id="info-dropdown"
            >
              <li><Link to="/about" className="default-links">About <FaInfoCircle className="icon" /></Link></li>
              <li><Link to="/contribute" className="default-links">Help FanArcs <FaQuestionCircle className="icon" /></Link></li>
              <li><Link to="/community" className="default-links">Community <FaUsers className="icon" /></Link></li>
              <li><Link to="/downloads" className="default-links">Downloads <FaDownload className="icon" /></Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavigation;
