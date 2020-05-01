import React from 'react'
import { Byline } from './byline'
import blogLedeStyles from './blog-lede.module.scss'
import FeaturedImage from './featured-image'

export default ({ headline, authors, date, lede, featuredImage }) => (
  <div className={blogLedeStyles.lede}>
    <h1 className="hed-primary">{headline}</h1>
    <p className={blogLedeStyles.ledeContent}>{lede}</p>
    <Byline authors={authors} date={date} />
    {featuredImage ? <FeaturedImage image={featuredImage} /> : <hr />}
  </div>
)
