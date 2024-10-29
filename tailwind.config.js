/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        mont: ["Montserrat"],
      },
      colors: {
        customGreen: "#54D11F",
        customBlue: "#0CC0DF",
      },
    },
  },
  plugins: [],
};
