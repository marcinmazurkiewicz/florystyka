module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-green': '#8bc34a',
        'dark-green': '#71a436',
        'deep-cyan': '#161B20',
        'black-01': 'rgba(0,0,0,0.1)',
        'black-05': 'rgba(0,0,0,0.5)',
        'red': '#ff5252',
        'dark-red': '#b23939',
        'dark-gray': '#20282f',
        'light-gray': '#2b353e',
        'azure': '#31b3dd'
      },
      fontFamily: {
        'lato': 'Lato, sans-serif',
      },
      backgroundImage: {
        'start-img': "url('img/start.png')"
      },
      minHeight: {
        '4/5': "80vh"
      },
      borderWidth: {
        '3': '3px'
      },
      gridTemplateColumns: {
        'dashboard': '200px auto'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}