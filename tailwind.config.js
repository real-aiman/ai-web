/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aapke theme ke liye custom gold color
        gold: '#FFD700',
      }
    },
  },
  plugins: [],
}