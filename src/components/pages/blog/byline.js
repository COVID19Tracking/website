import React, { Fragment } from 'react'
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

const AuthorSpacer = ({ index, length }) => {
  if (index === 0 && length === 2) {
    return <> & </> // first author, only two items in the list
  }
  if (index === length - 2) {
    return <>, & </> // second to last author
  }
  if (index === length - 1) {
    return null // last author
  }
  return <>, </>
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

const Byline = ({ authors, date }) => {
  const authorsWithHeadshots = authors.filter(author => author.headshot)
  return (
    <div className={bylineStyles.byline}>
      {authorsWithHeadshots.length > 0 && (
        <div className={bylineStyles.headshotContainer}>
          {authorsWithHeadshots.map(author => (
            <img
              src={author.headshot.resize.src}
              alt={author.headshot.file.fileName}
            />
          ))}
        </div>
      )}
      <p className={bylineStyles.authorDateContainer}>
        By:{' '}
        <p className={bylineStyles.author}>
          <AuthorsText authors={authors} />
        </p>
        <span className={bylineStyles.date}>{date}</span>
      </p>
    </div>
  )
}

const OneLineByline = ({ authors, date }) => (
  <p className={bylineStyles.oneLineByline}>
    By:{' '}
    <span className={bylineStyles.author}>
      <AuthorsText authors={authors} />
    </span>
    <span className="related-date">{date}</span>
  </p>
)

export { Byline, AuthorsText, OneLineByline }
