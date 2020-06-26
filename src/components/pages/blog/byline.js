import React, { Fragment } from 'react'
import bylineStyles from './byline.module.scss'
import AuthorSpacer from '~components/utils/list-spacer'

const getAuthorLink = author => {
  if (author.link) {
    return author.link
  }
  if (author.twitterLink) {
    return author.twitterLink
  }
  return null
}

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

const AuthorsText = ({ authors }) => (
  <>
    {authors.map((author, index) => (
      <Fragment key={`author-${author.name}`}>
        <Author author={author} />
        <AuthorSpacer index={index} length={authors.length} />
      </Fragment>
    ))}
  </>
)

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
      <span className={bylineStyles.author}>
        By <AuthorsText authors={authors} />
      </span>
      <span className={bylineStyles.date}>{date}</span>
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
