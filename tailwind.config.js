module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        primary: "#205781",
        secondary: "#4F959D",
        accent: "#98D2C0",
        highlight: "#F6F8D5",
      },
    },
  },
};
