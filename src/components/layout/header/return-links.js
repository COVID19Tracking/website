import React from 'react'
import { Link } from 'gatsby'
import headerStyle from './header.module.scss'

export default ({ links, pathNavigation, topNavigation }) => {
  let returnLinks = []
  if (pathNavigation.parent) {
    returnLinks.push(pathNavigation.parent)
  }
  if (links) {
    returnLinks = returnLinks.concat(links)
  }
  if (returnLinks === [] || pathNavigation.top) {
    return null
  }

  const topNavLinks = topNavigation.map(navItem =>
    navItem.link.replace(/^\/|\/$/g, ''),
  )
  returnLinks.forEach((link, index) => {
    const customTitle = link.title
    const matchingTopNavLink = topNavLinks.indexOf(
      link.link.replace(/^\/|\/$/g, ''),
    )

    if (matchingTopNavLink !== -1) {
      // pulls the title info for nav elements
      returnLinks[index] = topNavigation[matchingTopNavLink]
      if (link.title) {
        // use the specific title, if it exists
        returnLinks[index].title = customTitle
      }
    }
  })

  // todo remove duplicate link locations
  return (
    <div className={headerStyle.returnLink}>
      {returnLinks.map(returnLink => (
        <Link to={returnLink.link} key={returnLink.link}>
          <span aria-hidden>←</span> {returnLink.title}
        </Link>
      ))}
    </div>
  )
}
