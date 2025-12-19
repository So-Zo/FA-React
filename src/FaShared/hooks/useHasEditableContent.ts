import { useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * Hook to determine if the current page has editable content
 *
 * This hook checks the current route against a list of known non-editable pages.
 * By default, pages are assumed to be editable unless explicitly excluded.
 * This approach is more maintainable as new wiki pages don't need to be added.
 *
 * @returns {boolean} True if the current page has editable content, false otherwise
 */
export const useHasEditableContent = (): boolean => {
  const location = useLocation();

  return useMemo(() => {
    const currentPath = location.pathname;

    // Define paths that should NOT have editable content
    // These pages don't use WikiEditor and shouldn't show the TipTap toolbar
    const nonEditablePaths = [
      "/", // Home page
      "/profile", // Profile page
      "/community", // Community page
      "/login", // Login page
      "/about", // About page
      "/contribute", // Contribute page
    ];

    // Also exclude paths that start with certain patterns
    const nonEditablePatterns = [
      "/post/", // Post detail pages (/post/123)
      "/user/", // User profile pages (/user/123)
      "/page-history/", // Page history pages
    ];

    // Check exact path matches
    if (nonEditablePaths.includes(currentPath)) {
      return false;
    }

    // Check pattern matches
    if (
      nonEditablePatterns.some((pattern) => currentPath.startsWith(pattern))
    ) {
      return false;
    }

    // Default to editable (most wiki pages should have editing)
    return true;
  }, [location.pathname]);
};
