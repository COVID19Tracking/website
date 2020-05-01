import React from 'react'
import { Link } from 'gatsby'
import categoryStyles from './categories.module.scss'

export default ({ categories }) => (
  <div className={categoryStyles.categoriesContainer}>
    {categories.map(category => (
      <p className={categoryStyles.category} key={category.slug}>
        <Link to={`/blog/category/${category.slug}`}>{category.name}</Link>
      </p>
    ))}
  </div>
)
