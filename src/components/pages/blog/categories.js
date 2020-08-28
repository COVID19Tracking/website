import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import categoryStyles from './categories.module.scss'

const BlogCategories = ({ categories, lightBackground }) => {
  if (!categories) {
    return null
  }
  return (
    <div className={categoryStyles.categoriesContainer}>
      {categories.map(category => (
        <p
          className={classnames(
            categoryStyles.category,
            lightBackground && categoryStyles.lightBg,
          )}
          key={category.slug}
        >
          <Link to={`/blog/category/${category.slug}`}>{category.name}</Link>
        </p>
      ))}
    </div>
  )
}

export default BlogCategories
