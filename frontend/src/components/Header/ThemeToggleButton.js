import React, { useState } from 'react';

const ThemeToggleButton = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode', darkMode);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;