/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {},
    colors: {
      black: "#000",
      white: "#fff",
      mainBack: "#E6E9F2",
      cardMobile: "#EFF0F5",
      titleGrey: "#3A4562",
      lightGrey: "#878D9D",
      darkGrey: "#70778B",
      blueActive: "#5876C5",
      purple: "#988B49",
      yellowLight: "#fff8d9",
      yellow: "#FFCF00",
      backPagMob: "#F9FAFD",
      button: "#384564",
      map: "#2A3047",
      blueLight: "#55699E",
    },
    screens: {
      sm: { min: "320px", max: "960px" },
      xl: { min: "961px" },
    },
    fontFamily: {
      nova: ["Proxima Nova", "sans-serif"],
      roboto: ["Roboto", "serif"],
    },
    container: {
      padding: "10px",
    },
  },
  plugins: [],
};
