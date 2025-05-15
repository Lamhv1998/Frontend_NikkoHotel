/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px', // 1200↑ 轉 Desktop
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: '0.75rem'
    },
    extend: {
      aspectRatio: {
        '5/4': '5 / 4',
        '4/6': '4 / 6'
      },
      fontSize: {
        display: [
          '6.25rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h1: [
          '3rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h2: [
          '2.5rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h3: [
          '2rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h4: [
          '1.75rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h5: [
          '1.5rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        h6: [
          '1.25rem',
          {
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            fontWeight: '700'
          }
        ],
        title: [
          '1rem',
          {
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            fontWeight: '700'
          }
        ],
        'sub-title': [
          '0.875rem',
          {
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            fontWeight: '700'
          }
        ],
        body: [
          '1rem',
          {
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            fontWeight: '500'
          }
        ],
        'body-2': [
          '0.875rem',
          {
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            fontWeight: '500'
          }
        ],
        tiny: [
          '0.75rem',
          {
            lineHeight: 1.5,
            letterSpacing: '0.02em',
            fontWeight: '500'
          }
        ],
        'icon-20': '1.25rem',
        'icon-24': '1.5rem',
        'icon-40': '2.5rem',
        'icon-48': '3rem',
        'icon-80': '5rem'
      },
      colors: {
        system: {
          primary: {
            120: '#7B6651',
            100: '#BF9D7D',
            80: '#D0B79F',
            60: '#E1D1C2',
            40: '#F1EAE4',
            10: '#FAF7F5'
          },
          success: {
            120: '#299F65',
            100: '#52DD7E',
            60: '#BCFBBD',
            10: '#E8FEE7'
          },
          info: {
            120: '#1D66AC',
            100: '#3BADEF',
            60: '#B1EFFD',
            10: '#E6FBFE'
          },
          error: {
            120: '#C22538',
            100: '#DA3E51',
            60: '#F5CCD1',
            10: '#FDECEF'
          },
          background: '#140F0A',
          black: '#000000',
          gray: {
            80: '#4B4B4B',
            60: '#909090',
            40: '#ECECEC',
            10: '#F9F9F9'
          },
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        serif: ["'Noto Seri'", ...defaultTheme.fontFamily.serif]
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px'
          },
          '@screen md': {
            maxWidth: '720px'
          },
          '@screen lg': {
            maxWidth: '960px'
          },
          '@screen xl': {
            maxWidth: '1140px'
          },
          '@screen 2xl': {
            maxWidth: '1320px'
          }
        }
      })
    }
  ]
}
