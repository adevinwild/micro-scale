"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("_theme") as Theme) || "light"
  );

  const contextValue: ThemeContext = {
    theme,
    setTheme,
  };

  useEffect(() => {
    const updateHTMLClass = () => {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(theme);
      }
    };

    const updateLocalStorage = () => {
      localStorage.setItem("_theme", theme);
    };

    updateHTMLClass();
    updateLocalStorage();
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
