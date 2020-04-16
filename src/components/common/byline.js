import React from 'react'
import bylineStyles from './byline.module.scss'

export default ({ author, date }) => (
  <div className={bylineStyles.byline}>
    <a href={author.twitterLink}>{author.name}</a>
    <span className={bylineStyles.date}>{date}</span>
  </div>
)
