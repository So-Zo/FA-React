import React from "react";
import { ProfileSection } from "../../../../types";

interface ProfileNavigationProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
  isOwnProfile: boolean; // Add this to control which sections to show
}

export const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  activeSection,
  onSectionChange,
  isOwnProfile,
}) => {
  // Define sections that are public vs private
  const publicSections: ProfileSection[] = ["comments", "posts"];
  const privateSections: ProfileSection[] = ["settings", "notifications"];

  // Show all sections for own profile, only public for others
  const visibleSections = isOwnProfile
    ? [...publicSections, ...privateSections]
    : publicSections;

  return (
    <nav className="profile-options-bar">
      {visibleSections.map((section) => (
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
