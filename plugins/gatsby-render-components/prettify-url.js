const prettifyUrl = url => {
  const spacesReplaced = url.replace(' ', '-')
  return spacesReplaced.replace(/[^a-zA-Z0-9-_.]/g, '').toLowerCase()
}

module.exports = prettifyUrl
