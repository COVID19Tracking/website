const getAuthorLink = author => {
  if (author.link) {
    return author.link
  }
  if (author.twitterLink) {
    return author.twitterLink
  }
  return null
}

export default getAuthorLink
