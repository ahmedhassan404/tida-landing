import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./themeContext.js";

const STORAGE_KEY = "masar-global-theme";
const THEME_COLORS = {
  dark: "#82378C",
  light: "#F2F2F2",
};

function initialTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
