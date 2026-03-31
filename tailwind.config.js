/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        unp: {
          blue: '#003B8E',
          blueDark: '#022A63',
          orange: '#F7941D',
          ice: '#EAF2FF',
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -28px rgba(2, 42, 99, 0.45)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}

