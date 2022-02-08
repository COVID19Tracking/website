import React from 'react'
import { Link } from 'gatsby'

import Lede from './blog-lede'
import ReturnLinks from '~components/layout/header/return-links'

import rightCaret from '~images/icons/right-caret.svg'
import blogHeroStyles from './blog-hero.module.scss'

const BlogHero = ({
  categories,
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
    <ReturnLinks>
      <span>Categories</span>
      {categories && (
        <>
          <img src={rightCaret} alt="" height="12px" />
          {categories.slice(0, 2).map((category, index) => (
            <>
              <Link to={`/analysis-updates/category/${category.slug}`}>
                {category.name}
              </Link>
              {index !== categories.slice(0, 2).length - 1 && (
                <span aria-hidden>&bull;</span>
              )}
            </>
          ))}
        </>
      )}
    </ReturnLinks>
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
