import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import categoryStyles from './blog-categories.module.scss'

const BlogCategories = ({ categories, lightBackground, subPath, useLink }) => {
  if (!categories) {
    return null
  }

  const linkHref = category =>
    useLink ? `${subPath}/category/${category.slug}` : subPath

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
          <Link to={linkHref(category)}>{category.name}</Link>
        </p>
      ))}
    </div>
  )
}

export default BlogCategories
