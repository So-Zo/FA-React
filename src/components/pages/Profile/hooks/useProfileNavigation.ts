import { useState, useCallback } from "react";
import { ProfileSection } from "../types";

export function useProfileNavigation(initialSection: ProfileSection = "posts") {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>(initialSection);

  const navigateToSection = useCallback((section: ProfileSection) => {
    setActiveSection(section);
  }, []);

  return {
    activeSection,
    navigateToSection,
  };
}
