const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
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
        }
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        'heading': ['Lato', ...defaultTheme.fontFamily.sans],
      }
    }
  }
}
