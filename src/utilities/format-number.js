export default number => {
  if (typeof number === 'undefined' || (!number && number !== 0)) {
    return 'N/A'
  }
  return number.toLocaleString()
}
