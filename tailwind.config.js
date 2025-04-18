/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFBC11",
      },
      backgroundColor: {
        primary: "#FFBC11",
      },
    },
  },
  plugins: [],
};
