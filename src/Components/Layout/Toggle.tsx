import Moon from "@iconscout/react-unicons/icons/uil-moon";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import { useEffect, useState } from "react";

const Toggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="relative inline-block w-12 h-6 rounded-full overflow-hidden dark:bg-blue-400 bg-cyan-500 focus:outline-none cursor-pointer"
      onClick={handleToggle}
    >
      <button
        className={`absolute top-0 left-0 w-6 h-6 rounded-full shadow-md transform transition-transform ${
          darkMode ? "translate-x-full bg-blue-800" : "bg-white"
        }`}
      >
        {darkMode ? (
          <Moon
            className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold "
            size={12}
          />
        ) : (
          <Sun
            className="text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            size={12}
          />
        )}
      </button>
    </div>
  );
};

export default Toggle;