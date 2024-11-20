/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 6px 0px rgba(0, 0, 0 , 0.1)',
      },
      scale: {
        102: '1.02',
      },
    },
  },
  plugins: [],
};
