/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
      'large-desktop': '1280px'
    },
    extend: {
      spacing: {
        // '12pt': '12pt'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
