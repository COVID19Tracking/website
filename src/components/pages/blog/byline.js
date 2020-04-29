import React from 'react'
import bylineStyles from './byline.module.scss'

const Author = ({ author }) => (
  <>
    {author.twitterLink ? (
      <a className={bylineStyles.authorInner} href={author.twitterLink}>
        {author.name}
      </a>
    ) : (
      <span className={bylineStyles.authorInner}>{author.name}</span>
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

export default ({ authors, date }) => (
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
      By:{' '}
      {authors.map((author, index) => (
        <>
          <Author author={author} />
          <AuthorSpacer index={index} length={authors.length} />
        </>
      ))}
    </span>
    <span className={bylineStyles.date}>{date}</span>
  </div>
)
