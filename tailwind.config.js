/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    fontFamily: {
      Mada: ['Mada', 'sans-serif'],
      monst: ['monsterrat', 'sans-serif'],
      gilroy: ['Gilroy', 'sans-serif']
    },
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'infinite-scroll-reverse': 'infinite-scroll-reverse 25s linear infinite', 
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-reverse': { 
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      colors: {
        'primary-01': '#D2D7DD',
        'primary-02': '#A5AEBC',
        'primary-03': '#77869A',
        'primary-04': '#4A5D79',
        'primary-05': '#1D3557',
        'primary-06': '#172A46',
        'primary-07': '#112034',
        'primary-08': '#0C1523',
        'primary-09': '#060B11',
        'secondary-01': '#DAE5EB',
        'secondary-02': '#B5CAD8',
        'secondary-03': '#8FB0C4',
        'secondary-04': '#6A95B1',
        'secondary-05': '#457B9D',
        'secondary-06': '#37627E',
        'secondary-07': '#294A5E',
        'secondary-08': '#1C313F',
        'secondary-09': '#0E191F',
        'error-04': '#EB616B',
        'success-06': '#55D09D',
        'accent-03': '#658384',
        heading: '#1f2937',
        card: '#ffffff',
      },
      boxShadow: {
        btn: '2px 2px 8px 0px rgba(0, 0, 0, 0.16);',
        card: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
      },
      screens: {
        xlg: { max: '1800px' },
        xmd: { max: '990px' },
        xsm: { max: '600px' },
        xxs: { max: '400px' },
        minmd: '1700px',
        minlg: '2100px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
