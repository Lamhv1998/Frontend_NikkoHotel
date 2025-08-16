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
      xl: '1200px',
      '2xl': '1400px'
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px'
      }
    },
    extend: {
      aspectRatio: {
        '5/4': '5 / 4',
        '4/6': '4 / 6',
        '16/9': '16 / 9',
        '21/9': '21 / 9'
      },
      fontSize: {
        // Display sizes
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        
        // Heading sizes
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'h6': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        
        // Body text
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        
        // Special text
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.025em', fontWeight: '500' }],
        'overline': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase' }],
        
        // Icon sizes
        'icon-xs': '0.75rem',
        'icon-sm': '1rem',
        'icon-md': '1.25rem',
        'icon-lg': '1.5rem',
        'icon-xl': '2rem',
        'icon-2xl': '2.5rem',
        'icon-3xl': '3rem'
      },
      colors: {
        // Primary color palette
        primary: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b1',
          300: '#f8b883',
          400: '#f49455',
          500: '#f17a2e',
          600: '#e25f1a',
          700: '#bc4a16',
          800: '#963b19',
          900: '#7a3218',
          950: '#421709'
        },
        
        // Neutral color palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        
        // Accent colors
        accent: {
          gold: '#d4af37',
          silver: '#c0c0c0',
          bronze: '#cd7f32'
        },
        
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },
        
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        
        // Background colors
        background: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          dark: '#0f172a',
          overlay: 'rgba(0, 0, 0, 0.5)'
        },
        
        // Text colors
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          tertiary: '#94a3b8',
          inverse: '#ffffff'
        },
        
        // Border colors
        border: {
          light: '#e2e8f0',
          medium: '#cbd5e1',
          dark: '#94a3b8'
        },
        
        // Legacy system colors for backward compatibility
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
      
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
        '4xl': '6rem',      // 96px
        '5xl': '8rem',      // 128px
        '6xl': '12rem',     // 192px
      },
      
      borderRadius: {
        'sm': '0.25rem',     // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.5rem',     // 24px
        'full': '9999px'
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'luxury': '0 20px 40px -12px rgba(212, 175, 55, 0.3)',
        'primary': '0 10px 25px -5px rgba(241, 122, 46, 0.3)'
      },
      
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'serif': ['Playfair Display', ...defaultTheme.fontFamily.serif],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        'display': ['Playfair Display', 'Georgia', 'serif']
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px'
      },
      
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080'
      }
    }
  },
  
  plugins: [
    // Custom container plugin
    function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          
          '@screen sm': {
            maxWidth: '540px',
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6')
          },
          '@screen md': {
            maxWidth: '720px'
          },
          '@screen lg': {
            maxWidth: '960px'
          },
          '@screen xl': {
            maxWidth: '1140px',
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8')
          },
          '@screen 2xl': {
            maxWidth: '1320px'
          }
        },
        
        // Luxury card component
        '.card-luxury': {
          background: 'linear-gradient(135deg, #d4af37, #f17a2e)',
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.luxury'),
          color: theme('colors.text.inverse'),
          padding: theme('spacing.8'),
          transition: 'all 0.3s ease-in-out',
          
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.2xl')
          }
        },
        
        // Glass effect component
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: theme('borderRadius.xl')
        },
        
        // Text gradient utility
        '.text-gradient': {
          background: 'linear-gradient(135deg, #f17a2e, #d4af37)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text'
        }
      })
    }
  ]
}
