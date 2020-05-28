import React from 'react'
import { Link } from 'gatsby'
import headerStyle from '~components/layout/header/header.module.scss'

export default ({ currentItem, returnLinkTitle }) => {
  if (!currentItem || currentItem.top) {
    return null
  }
  return (
    <div className={headerStyle.returnLink}>
      <Link to={currentItem.parent.link}>
        <span aria-hidden>←</span>{' '}
        {returnLinkTitle ? (
          <>{returnLinkTitle}</>
        ) : (
          <>{currentItem.parent.title}</>
        )}
      </Link>
    </div>
  )
}
