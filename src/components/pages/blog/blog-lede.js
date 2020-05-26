import React from 'react'
import { Byline } from './byline'
import blogLedeStyles from './blog-lede.module.scss'
import FeaturedImage from './featured-image'
import CleanSpacing from '~components/utils/clean-spacing'

export default ({ headline, authors, date, lede, featuredImage }) => (
  <div className={blogLedeStyles.lede}>
    <h1 className="hed-primary">{headline}</h1>
    <p className={blogLedeStyles.ledeContent}>
      <CleanSpacing>{lede}</CleanSpacing>
    </p>
    <Byline authors={authors} date={date} />
    {featuredImage ? <FeaturedImage image={featuredImage} /> : <hr />}
  </div>
)
