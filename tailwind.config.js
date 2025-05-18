/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "linear-gradient(163deg, rgba(203,140,197,1) 1%, rgba(97,89,183,1) 57%)",
      },
      fontFamily: {
        body: ["Karla", "sans-serif"],
      }
    },
  },
 

  plugins: [
    require('tailwindcss-motion'),
  ], 
}
