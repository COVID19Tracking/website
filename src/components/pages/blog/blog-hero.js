import React from 'react'
import Container from '~components/common/container'
import Categories from '~components/pages/blog/categories'
import Lede from '~components/pages/blog/blog-lede'
import blogHeroStyles from './blog-hero.module.scss'

export default ({
  categories,
  headline,
  authors,
  date,
  lede,
  featuredImage,
  slug,
}) => (
  <Container className={blogHeroStyles.container} narrow centered>
    <Categories categories={categories} />
    <Lede
      headline={headline}
      authors={authors}
      date={date}
      lede={lede}
      featuredImage={featuredImage}
      slug={slug}
      darkBackground
    />
  </Container>
)
