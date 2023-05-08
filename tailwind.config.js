/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lime: "#00ff00",
        pink: "#ff10f0",
      },
    },
  },
  plugins: [],
};