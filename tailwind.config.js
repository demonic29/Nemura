/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        'white-glow': '0 0 15px rgba(255, 255, 255, 0.3)',
        'white-glow-str': '0 0 15px rgba(255, 255, 255, 1)',
      },
      colors: {
        'white-soft': '#FEFEFE',
        'black-soft': '#222222', 
        'gray-soft': '#4B5563',
        'button': '#1D57A6',
      },
      backgroundImage: {
        'background-light': 'linear-gradient(to bottom, #00040a, #003569, #004E9A)',
        'voice-button': 'linear-gradient(to bottom, #0D1B2A, #3A86FF)',
      },
      spacing: {
        'space-2x': '16px',
        'header-h': '54px',
        'footer-h': '24px',
      },
      fontSize: {
        base: '16px',
        strong: '24px',
        max: '32px',
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', 'sans-serif'], 
      },

      // アニメーション
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};