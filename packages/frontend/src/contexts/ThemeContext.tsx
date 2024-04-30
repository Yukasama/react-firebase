import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext({} as any);
export function useTheme() {
  return useContext(ThemeContext);
}

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const html = document.documentElement;
    theme === "dark"
      ? html.classList.add("dark")
      : html.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
