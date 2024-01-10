/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      // (min-width: 640px)

      md: "768px",
      // (min-width: 768px)

      lg: "1024px",
      // (min-width: 1024px)

      xl: "1367px",
      // (min-width: 1280px)
    },
    extend: {
      fontFamily: {
        intern: "Poppins",
      },
      colors: {
        mainColors: "#7209B7",
        hoverMainColors: "#512370",
        secondColors: "#512370",
        thirdColors: "#9575DE",
        black: "#2B2730",
      },
    },
  },
  plugins: [],
};
