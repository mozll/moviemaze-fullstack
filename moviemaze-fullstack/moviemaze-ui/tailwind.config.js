/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        moviePurple: "#4A238E",
        movieLightDark: "#1e2732",
        movieMediumDark: "#15202B",
        movieDarkestDark: "#0f1419",
        movieLightGreen: "#00ba7c",
        movieMediumGreen: "#005d3e",
        movieDarkGreen: "#003825",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
