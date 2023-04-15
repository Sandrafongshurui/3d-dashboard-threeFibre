/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'border-top-right': {
          '0%': { width: '0px', height: '0px' },
          '25%': { width: '240px', height: '0px' },
          '50%': { width: '240px', height: '80px' },
          '100%': { width: '240px', height: '80px' },
        },
      },
    },
  },
  plugins: [],
}
