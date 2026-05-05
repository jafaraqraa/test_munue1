/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#60A5FA',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        'category-burgers': '#EEF2FF',
        'category-pizzas': '#FFF7ED',
        'category-shawarma': '#EEF2FF',
        'category-salads': '#F1F5F9',
        'category-drinks': '#EEF2FF',
        'category-desserts': '#FFF7ED',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 4px 10px -5px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 8px 16px -8px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
