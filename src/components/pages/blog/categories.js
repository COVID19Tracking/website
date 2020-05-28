import React from 'react'
import { Link } from 'gatsby'
import categoryStyles from '~components/pages/blog/categories.module.scss'

export default ({ categories }) => {
  if (!categories) {
    return null
  }
  return (
    <div className={categoryStyles.categoriesContainer}>
      {categories.map(category => (
        <p className={categoryStyles.category} key={category.slug}>
          <Link to={`/blog/category/${category.slug}`}>{category.name}</Link>
        </p>
      ))}
    </div>
  )
}
