import React, { Fragment } from 'react'
import bylineStyles from './byline.module.scss'

const Author = ({ author }) => (
  <>
    {author.twitterLink ? (
      <a className="author-inner" href={author.twitterLink}>
        {author.name}
      </a>
    ) : (
      <span className="author-inner">{author.name}</span>
    )}
  </>
)

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

const Byline = ({ authors, date }) => (
  <div className={bylineStyles.byline}>
    {authors
      .filter(author => author.headshot)
      .map(author => (
        <img
          src={author.headshot.resize.src}
          alt={author.headshot.file.fileName}
        />
      ))}
    <span className={bylineStyles.author}>
      By: <AuthorsText authors={authors} />
    </span>
    <span className={bylineStyles.date}>{date}</span>
  </div>
)

export { Byline, AuthorsText }
