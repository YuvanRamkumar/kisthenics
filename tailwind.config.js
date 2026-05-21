/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        gold: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245,158,11,0.15)',
        },
        navy: '#1E3A8A',
        cream: '#FEF3C7',
        text: {
          primary: '#FEF3C7',
          secondary: '#FCD34D',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        quote: ['Playfair Display', 'serif'],
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 20%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        }
      },
    },
  },
  plugins: [],
}