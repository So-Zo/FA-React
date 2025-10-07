import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  currentTheme: ThemeMode;
  effectiveTheme: "light" | "dark"; // The actual theme being applied (resolves 'system' to light/dark)
  prefersDark: boolean; // System preference
}

interface ThemeActions {
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void; // Toggles between light/dark (ignores system)
  resetToSystem: () => void; // Resets to system preference
  isDark: () => boolean; // Returns true if current effective theme is dark
}

interface ThemeContextType extends ThemeState, ThemeActions {}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode;
    return savedTheme || "system"; // Default to system
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(getInitialTheme);
  const [prefersDark, setPrefersDark] = useState(getSystemTheme());
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    currentTheme === "system"
      ? getSystemTheme()
        ? "dark"
        : "light"
      : currentTheme
  );

  // Apply theme to document
  const applyTheme = (theme: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", theme);
    setEffectiveTheme(theme);
  };

  // Update effective theme when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches);
      if (currentTheme === "system") {
        applyTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [currentTheme]);

  // Update theme when currentTheme changes
  useEffect(() => {
    if (currentTheme === "system") {
      applyTheme(prefersDark ? "dark" : "light");
    } else {
      applyTheme(currentTheme);
    }
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme, prefersDark]);

  const contextValue: ThemeContextType = {
    // State
    currentTheme,
    effectiveTheme,
    prefersDark,

    // Actions
    setTheme: (theme: ThemeMode) => setCurrentTheme(theme),
    toggleTheme: () =>
      setCurrentTheme(effectiveTheme === "light" ? "dark" : "light"),
    resetToSystem: () => setCurrentTheme("system"),
    isDark: () => effectiveTheme === "dark",
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
