import React from 'react'
import Byline from './byline'
import blogLedeStyles from './blog-lede.module.scss'

export default ({ headline, author, date, lede }) => (
  <div className={blogLedeStyles.lede}>
    <h1>{headline}</h1>
    <p className="blog-lede">{lede}</p>
    <Byline author={author} date={date} />
  </div>
)
