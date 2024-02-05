const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm:"349px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      keyframes:{
        movingUp:{
            '0%':{transform:'translateY(0)'},
            '50%':{transform:'translateY(-12px)'},
            '100%':{transform:'translateY(0px)'},
        }
    },
    animation:{
      movingUp:"movingUp 1s ease-in-out infinite"
    },
      colors:{
        blueColor:"#103755",
        yellowColor:"#eeb808",
        greyColor:"#63766b",
        darkColor:'#212529',
        whiteColor:'#f8f8fa',
      },
      
    },
  },
  plugins: [],
})