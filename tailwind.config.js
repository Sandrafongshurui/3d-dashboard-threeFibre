/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'border-top-left-to-center': {
          '0%': { left:"20px", width: '24px'},
          '100%': { left:"95px", width: '50px'},
        },
        'border-top-center-to-left': {
          '0%': { left:"95px", width: '50px'},
          '100%': { left:"20px", width: '24px'},
        },
        'border-bottom-right-to-center': {
          '0%': { right:"20px", width: '24px'},
          '100%': { right:"95px", width: '50px'},
        },
        'border-bottom-center-to-right': {
          '0%': { right:"95px", width: '50px'},
          '100%': { right:"20px", width: '24px'},
        },
      },
    },
  },
  plugins: [],
}
