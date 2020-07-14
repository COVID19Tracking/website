import React from 'react'
import Categories from '~components/pages/blog/categories'
import Lede from '~components/pages/blog/blog-lede'
import blogHeroStyles from './blog-hero.module.scss'

export default ({ categories, headline, authors, date, lede, id }) => (
  <div className={blogHeroStyles.container} narrow centered>
    <Categories categories={categories} />
    <Lede
      headline={headline}
      authors={authors}
      date={date}
      lede={lede}
      id={id}
      darkBackground
    />
  </div>
)
