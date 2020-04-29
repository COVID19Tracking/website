import React from 'react'
import { Byline } from './byline'
import blogLedeStyles from './blog-lede.module.scss'

export default ({ headline, authors, date, lede }) => (
  <div className={blogLedeStyles.lede}>
    <h1 className="hed-primary">{headline}</h1>
    <p className="blog-lede">{lede}</p>
    <Byline authors={authors} date={date} />
  </div>
)
