import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import categoryStyles from './blog-categories.module.scss'

const BlogCategories = ({ categories, lightBackground }) => {
  if (!categories) {
    return null
  }
  return (
    <div className={categoryStyles.categoriesContainer}>
      {categories.slice(0, 2).map(category => (
        <p
          className={classnames(
            categoryStyles.category,
            lightBackground && categoryStyles.lightBg,
          )}
          key={category.slug}
        >
          <Link to={`/analysis-updates/category/${category.slug}`}>
            {category.name}
          </Link>
        </p>
      ))}
    </div>
  )
}

export default BlogCategories
