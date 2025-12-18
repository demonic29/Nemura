const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-soft": "#FEFEFE",
        "black-soft": "#222222",
      },
      backgroundImage: {
        "background-light":
          "linear-gradient(to bottom, #00050c, #02172c, #04234a)",
        "voice-button": "linear-gradient(to bottom, #0D1B2A, #3A86FF)",
      },
      spacing: {
        "space-2x": "16px",
        "header-h": "54px",
        "footer-h": "24px",
      },
      fontSize: {
        base: "16px",
        strong: "24px",
        max: "32px",
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), nextui()],
};
