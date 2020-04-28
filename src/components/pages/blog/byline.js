import React from 'react'
import bylineStyles from './byline.module.scss'

export default ({ author, date }) => (
  <div className={bylineStyles.byline}>
    {author.headshot && (
      <img
        src={author.headshot.resize.src}
        alt={author.headshot.file.fileName}
      />
    )}
    <span className={bylineStyles.author}>
      By:{' '}
      {author.twitterLink ? (
        <a href={author.twitterLink}>{author.name}</a>
      ) : (
        <>{author.name}</>
      )}
    </span>
    <span className={bylineStyles.date}>{date}</span>
  </div>
)
