module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        base: '0 2px 4px rgba(10, 30, 30, 0.3)',
        hover: '2px 4px 16px rgba(10, 30, 30, 0.6)',
      },
      scale: {
        101: '1.01',
      },
      maxWidth: {
        '2xs': '18rem',
      },
      spacing: {
        100: '25rem',
        128: '32rem',
      },
      borderWidth: {
        10: '10px',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      ekaly: ['Kalam'],
    },
  },
  plugins: [],
}
