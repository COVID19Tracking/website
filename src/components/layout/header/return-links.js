import React from 'react'
import { Link } from 'gatsby'
import headerStyle from './header.module.scss'

export default ({ links, pathNavigation }) => {
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
// topNavigation.forEach(item => {
//   if (
//     returnLink &&
//     returnLink.replace(/^\/|\/$/g, '') === item.link.replace(/^\/|\/$/g, '')
//   ) {
//     pathNavigation = {
//       top: false,
//       parent: item,
//       subNavigation: false,
//     }
//     return
//   }
// }
