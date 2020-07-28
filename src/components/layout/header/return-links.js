import React from 'react'
import { Link } from 'gatsby'
import returnLinksStyle from './return-links.module.scss'
import rightCaret from '~images/icons/right-caret.svg'

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

  const lastReturnLinkIndex = returnLinks.length - 1

  return (
    <div className={returnLinksStyle.returnLinkContainer}>
      {returnLinks.map((returnLink, index) => (
        <React.Fragment key={returnLink.link}>
          <Link to={returnLink.link}>{returnLink.title}</Link>
          {index !== lastReturnLinkIndex && (
            <img src={rightCaret} alt="" height="12px" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
