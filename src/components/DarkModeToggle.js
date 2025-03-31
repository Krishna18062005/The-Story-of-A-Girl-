import { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  return <button onClick={toggleDarkMode} className="tog">{darkMode ? "🌜" : "🌑"}</button>;
};

export default DarkModeToggle;
