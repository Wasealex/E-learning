/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D0D0D0",
        secondary: "#353636",
        black: "#000000",
        white: "#FFFFFF",
        gray: "#D0D0D0",
        blue: "#0088CC",
      },
    },
  },
  plugins: [],
};
