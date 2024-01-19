/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    screens: {
      sm: "640px",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
