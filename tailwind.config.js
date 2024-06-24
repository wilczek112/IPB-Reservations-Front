/** @type {import('tailwindcss').Config} */


module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../../public/logo_ipb.png'')"
      }
    },
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/MainPage/index.js'],
  theme: {
    extend: {
      colors: {

        'cardinal-pink': '#820553',
        'melanie': '#deaccc',
        'bouquet': '#ae7d9a',
        'tapestry': '#a85a8b',
        'cannon-pink': '#8a4970',
        'loulou': '#501238',
        'hopbush': '#c85e9d',
        'disco': '#93206d',
        'hibiscus': '#a6216f',
        'mulberry-wood': '#5f072a',
      },
    },
  },
  plugins: [],
}

