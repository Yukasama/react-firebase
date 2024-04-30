import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      className="theme-toggle rounded-md border hover:bg-sun-400 dark:hover:bg-moon-200 transition-none">
      {theme === "light" ? (
        <DarkModeOutlined className="theme-toggle text" />
      ) : (
        <LightModeOutlined className="theme-toggle text" />
      )}
    </IconButton>
  );
};
