import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

// Gère le thème clair/sombre : initialisé depuis la préférence sauvegardée,
// sinon depuis la préférence système ; toute bascule est persistée et reflétée
// sur <html data-theme="..."> pour que les variables CSS globales s'appliquent.
export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#141414" : "#f9f9f7");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
};
