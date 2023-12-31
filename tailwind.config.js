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
        mainColors: "#152955",
        hoverMainColors: "#0d204a",
        secondColors: "#0049cc",
        thirdColors: "#9575DE",
        black: "#2B2730",
      },
    },
  },
  plugins: [],
};
