import React from 'react'
import { Link } from 'gatsby'
import categoryStyles from './categories.module.scss'

export default ({ categories }) => (
  <div className={categoryStyles.categoriesContainer}>
    {categories.map(category => (
      <p className="blog-lede" key={category.slug}>
        <Link to={category.slug}>{category.name}</Link>
      </p>
    ))}
  </div>
)
