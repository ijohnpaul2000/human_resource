/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      fontSize: {
        fsXL: "clamp(1rem, 7vw + 1rem, 5rem)",
      },
    },
  },
  plugins: [],
};
