import React from 'react'
import { Link } from 'gatsby'
import returnLinksStyle from './return-links.module.scss'
import rightCaret from '~images/icons/right-caret.svg'

const ReturnLinks = ({ links, pathNavigation, topNavigation, children }) => {
  /*
    links: a list of return links like {link: '/data', title: 'Data'}
      title is optional.
    pathNavigation: may contain a parent param, like a `links` item
      top: bool, if true, then don't show any return links
    topNavigation: the topNavigation data from YAML
    children: optional, used for custom returnLink situations (like the blog)
  */
  if (children) {
    return (
      <div className={returnLinksStyle.returnLinkContainer}>{children}</div>
    )
  }

  // assemble the returnLinks list
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

  // remove links that don't have a destination
  returnLinks = returnLinks.filter(returnLink => returnLink.link !== null)

  returnLinks.forEach((link, index) => {
    // use the topNavigation title if none is provided
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

  returnLinks = returnLinks.filter((returnLink, pos, arr) => {
    return arr.map(link => link.link).indexOf(returnLink.link) === pos
  })

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

export default ReturnLinks
