/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'border-top-left-to-center': {
          '0%': { left:"8px", width: '18px'},
          '100%': { left:"68px", width: '60px'},
        },
        'border-top-center-to-left': {
          '0%': { left:"50px", width: '60px'},
          '100%': { left:"8px", width: '18px'},
        },
        'border-bottom-right-to-center': {
          '0%': { right:"8px", width: '18px'},
          '100%': { right:"68px", width: '60px'},
        },
        'border-bottom-center-to-right': {
          '0%': { right:"50px", width: '60px'},
          '100%': { right:"8px", width: '18px'},
        },
      },
    },
    fontFamily: {
      alumni: ['Alumni Sans Pinstripe', 'sans-serif'],
    },
  },
  plugins: [],
}
