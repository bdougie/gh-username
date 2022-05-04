module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgGray: "#FAFAFA",
        green: "#25C65B"
      },
      fontFamily: {
        'inter': ['Inter']
      }
      
    },
  },
  plugins: [],
}
