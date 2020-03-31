import Typography from 'typography'

const fonts = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'sans-serif',
]

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.8,
  headerLineHeight: 2,
  headerFontFamily: fonts,
  bodyFontFamily: fonts,
})

export default typography
