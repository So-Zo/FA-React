import React from "react";
import { ProfileSection } from "../types";

interface ProfileNavigationProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const sections: ProfileSection[] = [
    "comments",
    "posts",
    "work-requests",
    "settings",
    "drafts",
    "notifications",
  ];

  return (
    <nav className="profile-options-bar">
      {sections.map((section) => (
        <button
          key={section}
          className={`profile-option-item${
            activeSection === section ? " active" : ""
          }`}
          onClick={() => onSectionChange(section)}
        >
          {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
        </button>
      ))}
    </nav>
  );
};
