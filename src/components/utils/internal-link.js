export default link => {
  if (link.substr(0, 1) === '/' || link.search('://') > -1) {
    return link
  }
  return `/${link}`
}
