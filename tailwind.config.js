/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0C9EB8",
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
};
