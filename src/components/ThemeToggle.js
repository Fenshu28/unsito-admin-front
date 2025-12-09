import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Icon } from "@iconify/react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-strokedark bg-white dark:bg-boxdark text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-meta-4 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Icon icon="mdi:white-balance-sunny" width="20" />
      ) : (
        <Icon icon="mdi:moon-waning-crescent" width="20" />
      )}
    </button>
  );
};

export default ThemeToggle;
