/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sun: '#f59e0b',
        aut: '#92400e',
        win: '#3b82f6',
        spr: '#10b981',
      },
    },
  },
  plugins: [],
}

