import React from 'react'
import bylineStyles from './byline.module.scss'
import { FormatItemList } from '~components/utils/format'
import getAuthorLink from '~components/utils/get-author-link'

const getBylineClass = (isSmallMargin, hasImage) => {
  if (isSmallMargin) {
    if (hasImage) {
      return bylineStyles.bylineSmallMarginImage
    }
    return bylineStyles.bylineSmallMargin
  }
  return bylineStyles.byline
}

const Author = ({ author }) => {
  const link = getAuthorLink(author)
  return (
    <>
      {link ? (
        <a className={bylineStyles.authorInner} href={link}>
          {author.name}
        </a>
      ) : (
        <span className={bylineStyles.authorInner}>{author.name}</span>
      )}
    </>
  )
}

const AuthorsText = ({ authors }) => {
  const keys = authors.map(author => `author-${author.name}`)
  const items = authors.map(author => <Author author={author} />)
  return <FormatItemList items={items} keys={keys} />
}

const Byline = ({ authors, date, smallmargin = false }) => {
  const authorsWithHeadshots = authors.filter(author => author.headshot)
  const hasHeadshots = authorsWithHeadshots.length > 0
  const bylineClass = getBylineClass(smallmargin, hasHeadshots)
  return (
    <div className={bylineClass}>
      {hasHeadshots && (
        <div className={bylineStyles.headshotContainer}>
          {authorsWithHeadshots.map(author => (
            <img
              key={author.headshot.resize.src}
              src={author.headshot.resize.src}
              alt=""
            />
          ))}
        </div>
      )}
      <p className={bylineStyles.bylineText}>
        <span className={bylineStyles.spacer}>By </span>
        <span className={bylineStyles.author}>
          <AuthorsText authors={authors} />
        </span>
        <span className={bylineStyles.date}>{date}</span>
      </p>
    </div>
  )
}

const OneLineByline = ({ authors, date }) => (
  <p className={bylineStyles.oneLineByline}>
    By{' '}
    <span className={bylineStyles.author}>
      <AuthorsText authors={authors} />
    </span>
    <span className={bylineStyles.relatedDate}>{date}</span>
  </p>
)

export { Byline, AuthorsText, OneLineByline }
