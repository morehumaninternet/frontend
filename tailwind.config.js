/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/animations/**/*.{js,jsx,ts,tsx}",
    "./src/effects/**/*.{js,jsx,ts,tsx}",
    "./src/fonts/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
    "./src/types.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}