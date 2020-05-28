import React from 'react'
import { Byline } from '~components/pages/blog/byline'
import blogLedeStyles from '~components/pages/blog/blog-lede.module.scss'
import FeaturedImage from '~components/pages/blog/featured-image'
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
