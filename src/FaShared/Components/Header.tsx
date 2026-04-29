import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
import { useEditMode } from "../types/editMode";

const Header: React.FC = () => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { canEdit, isEditing, toggle, save } = useEditMode();

  const handleEditSaveClick = async () => {
    if (!canEdit) {
      return;
    }

    console.log("🔘 Edit/Save button clicked", {
      canEdit,
      isEditing,
      willSave: isEditing,
    });
    if (isEditing) {
      console.log("💾 Calling save()...");
      await save();
      console.log("✅ save() complete");
    }
    toggle();
    console.log("🔄 Edit mode toggled, new state will be:", !isEditing);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="/logo-image.jpg"
              alt="FanArcs Logo"
              className="logo-image"
            />
            <span className="site-name">FanArcs</span>
          </Link>
        </div>

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              effectiveTheme === "light" ? "dark" : "light"
            } mode`}
          >
            {effectiveTheme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="edit-toggle"
            onClick={handleEditSaveClick}
            aria-label={isEditing ? "Save changes" : "Enter edit mode"}
            style={{ marginLeft: "12px", padding: "6px 10px" }}
            disabled={!canEdit}
          >
            {isEditing ? "Save" : "Edit"}
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
