/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#bae0ff",
          300: "#7cc8ff",
          400: "#36acff",
          500: "#0c91ff",
          600: "#2c74b3",
          700: "#24609a",
          800: "#1e4f7f",
          900: "#1d4269",
          950: "#162a45",
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
