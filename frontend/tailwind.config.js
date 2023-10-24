/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        test: "#e96d7b",
        Glossy1: "rgba(255, 255, 255, 0) 0%",
        Glossy2: "rgba(255, 255, 255, 0) 35%",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
