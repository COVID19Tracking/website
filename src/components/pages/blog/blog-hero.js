import React from 'react'
import { Link } from 'gatsby'

import Lede from '~components/pages/blog/blog-lede'
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
}) => (
  <div className={blogHeroStyles.container} narrow centered>
    <ReturnLinks>
      <Link to="/blog">Blog</Link>
      {categories && (
        <>
          <img src={rightCaret} alt="" height="12px" />
          {categories.map((category, index) => (
            <>
              <Link to={`/blog/category/${category.slug}`}>
                {category.name}
              </Link>
              {index !== categories.length - 1 && (
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
    />
  </div>
)

export default BlogHero
