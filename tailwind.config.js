module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': ['"Open Sans"']
    },
    extend: {
      colors: {
        black: '#111',
        purple: '#CB007B',
        orange: '#FF4713',
        green: '#00B189',
        yellow: '#FFBB3D',
      }
    },
  },
  plugins: [],
}