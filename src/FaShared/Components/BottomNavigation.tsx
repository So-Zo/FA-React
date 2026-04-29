import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
import { useEditMode } from "../types/editMode";
import { AuthContext } from "../hooks/AuthContext";
import {
  FaHome,
  FaUsers,
  FaUser,
  FaArrowUp,
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
  FaFistRaised,
  FaMoon,
  FaSun,
  FaEdit,
  FaSave,
  FaTools,
} from "react-icons/fa";

const BottomNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);

  // Header controls
  const { currentTheme, toggleTheme } = useTheme();
  const { canEdit, isEditing, toggle: toggleEdit, save } = useEditMode();
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.user !== null;

  const handleEditSaveClick = async () => {
    if (!canEdit) {
      return;
    }

    console.log("🔘 BOTTOM NAV: Edit/Save clicked", {
      canEdit,
      isEditing,
      willSave: isEditing,
      isLoggedIn,
    });

    // Check auth BEFORE entering edit mode
    if (!isEditing && !isLoggedIn) {
      alert(
        "⚠️ You must be logged in to edit wiki pages. Please log in first.",
      );
      return;
    }

    if (isEditing) {
      console.log("💾 BOTTOM NAV: Calling saveAll()");
      try {
        await save();
        console.log("✅ BOTTOM NAV: save() complete");
      } catch (error) {
        console.error("❌ Save failed:", error);
        alert("⚠️ Failed to save changes. Make sure you're logged in.");
        return; // Don't toggle edit mode if save failed
      }
    }
    console.log("🔄 BOTTOM NAV: Calling toggleEdit()");
    toggleEdit();
    console.log("✅ BOTTOM NAV: toggleEdit() called");
  };

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
      if (
        isMenuOpen &&
        !target.closest(".sidebar-dropdown-menu") &&
        !target.closest(".hamburger-menu-icon")
      ) {
        setIsMenuOpen(false);
        setCategoriesExpanded(false);
        setInfoExpanded(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
        <Link
          to="/"
          className="nav-home-button"
          aria-label="Go Home"
          title="Home"
        >
          <FaHome />
        </Link>
        <Link
          to="/community"
          className="nav-social-button"
          aria-label="Go to Community"
          title="Community"
        >
          <FaUsers />
        </Link>
        <Link
          to="/profile"
          className="nav-profile-button"
          aria-label="Profile Page"
          title="Profile"
        >
          <FaUser />
        </Link>
        <button
          className="nav-search-popup"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <FaArrowUp />
        </button>

        {/* Header controls */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${
            currentTheme === "light" ? "dark" : "light"
          } mode`}
          title="Toggle theme"
        >
          {currentTheme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <button
          onClick={handleEditSaveClick}
          aria-label={isEditing ? "Save changes" : "Enter edit mode"}
          title={isEditing ? "Save" : "Edit"}
          disabled={!canEdit}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>

        <div
          className={`hamburger-menu-icon ${isMenuOpen ? "active" : ""}`}
          aria-label="Open navigation menu"
          onClick={toggleMenu}
        >
          <FaBars />
        </div>
      </div>

      {/* The navigation menu that will show/hide */}
      <nav className={`sidebar-dropdown-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          {/* Categories dropdown */}
          <li>
            <button
              className="nav-dropdown-toggle"
              aria-expanded={categoriesExpanded}
              aria-controls="categories-dropdown"
              onClick={toggleCategoriesDropdown}
            >
              Categories{" "}
              <span>
                <FaChevronRight />
              </span>
            </button>
            <ul
              className={`nav-dropdown-menu ${
                categoriesExpanded ? "expanded" : ""
              }`}
              id="categories-dropdown"
            >
              <li>
                <Link to="/anime" className="default-links">
                  Anime <FaSeedling className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/comics" className="default-links">
                  Comics <FaBolt className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/manga" className="default-links">
                  Manga <FaBook className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/tv" className="default-links">
                  Television <FaTv className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/video-games" className="default-links">
                  Video Games <FaGamepad className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/worlds-universes" className="default-links">
                  Worlds & Universes <FaGlobe className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link to="/power-room" className="default-links">
                  Power Room <FaFistRaised className="icon" />
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/worlds-universes/directory"
                  className="default-links"
                >
                  Worlds Directory <FaGlobe className="icon" />
                </Link>
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
              FanArcs Info{" "}
              <span>
                <FaChevronRight />
              </span>
            </button>
            <ul
              className={`nav-dropdown-menu ${infoExpanded ? "expanded" : ""}`}
              id="info-dropdown"
            >
              <li>
                <Link to="/about" className="default-links">
                  About <FaInfoCircle className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="default-links">
                  Help FanArcs <FaQuestionCircle className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/community" className="default-links">
                  Community <FaUsers className="icon" />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="default-links">
                  Admin Page <FaTools className="icon" />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavigation;
