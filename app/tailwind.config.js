const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      minHeight: {
        'screen-20': '20vh',
        'screen-40': '40vh',
        'screen-60': '60vh',
        'screen-80': '80vh',
      },
      colors: {
        primary: {
          DEFAULT: '#5680e9',
          900: '#678deb',
          800: '#7899ed',
          700: '#89a6f0',
          600: '#9ab3f2',
          500: '#abc0f4',
          400: '#bbccf6',
          300: '#ccd9f8',
          200: '#dde6fb',
          100: '#eef2fd',
        },
        'primary-on': {
          DEFAULT: '#fff',
        },
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        'heading': ['Lato', ...defaultTheme.fontFamily.sans],
      }
    }
  }
}
