import React from 'react'
import classnames from 'classnames'
import Timezone from '~components/common/timezone'
import { FormatDate, FormatItemList } from '~components/utils/format'
import bylineStyles from './byline.module.scss'

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

const AuthorsText = ({ authors }) => {
  const keys = authors.map(author => `author-${author.name}`)
  const items = authors.map(author => <Author author={author} />)
  return <FormatItemList items={items} keys={keys} />
}

const Byline = ({
  authors,
  published,
  updated,
  smallmargin = false,
  darkBackground = false,
}) => {
  const authorsWithHeadshots = authors.filter(author => author.headshot)
  const hasHeadshots = authorsWithHeadshots.length > 0
  const bylineClass = getBylineClass(smallmargin, hasHeadshots)
  return (
    <div
      className={classnames(
        bylineClass,
        darkBackground && bylineStyles.darkBackground,
      )}
    >
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
      <span className={bylineStyles.bylineText}>
        <span className={bylineStyles.author}>
          By <AuthorsText authors={authors} />
        </span>
        <span className={bylineStyles.date}>
          {updated && <>published on </>}
          {published}
        </span>
        {updated && (
          <span className={bylineStyles.date}>
            updated at <FormatDate date={updated} format="h:mm a" />{' '}
            <Timezone /> on <FormatDate date={updated} format="LLLL d, yyyy" />
          </span>
        )}
      </span>
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
