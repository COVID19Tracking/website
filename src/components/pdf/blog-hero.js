import React from 'react'

import Lede from './blog-lede'
import blogHeroStyles from './blog-hero.module.scss'

const BlogHero = ({
  headline,
  authors,
  published,
  updated,
  lede,
  twitterText,
  id,
  hideByline,
  hideSocial = false,
}) => (
  <div className={blogHeroStyles.container} narrow centered>
    <Lede
      headline={headline}
      authors={authors}
      published={published}
      updated={updated}
      lede={lede}
      twitterText={twitterText}
      id={id}
      darkBackground
      hideByline={hideByline}
      hideSocial={hideSocial}
    />
  </div>
)

export default BlogHero
