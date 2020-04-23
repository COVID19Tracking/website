import React from 'react'
import bylineStyles from './byline.module.scss'

export default ({ author, date }) => (
  <div className={bylineStyles.byline}>
    <span className={bylineStyles.author}>
      {author.twitterLink ? (
        <a href={author.twitterLink}>{author.name}</a>
      ) : (
        <>{author.name}</>
      )}
    </span>
    <span className={bylineStyles.date}>{date}</span>
  </div>
)
