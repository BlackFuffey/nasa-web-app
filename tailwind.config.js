/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{html,jsx}"
    ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
