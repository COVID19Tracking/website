import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import blogCategoriesListStyles from './blog-categories-list.module.scss'

export default () => {
  const { allContentfulBlogCategory } = useStaticQuery(graphql`
    query {
      allContentfulBlogCategory {
        nodes {
          name
          slug
          blog_post {
            id
          }
        }
      }
    }
  `)

  // put the categories with the most posts first
  const categories = allContentfulBlogCategory.nodes.sort(
    (a, b) => b.blog_post.length - a.blog_post.length,
  )

  const [isOpen, setisOpen] = useState(false) // todo set default here

  return (
    <div className={blogCategoriesListStyles.container}>
      <div>
        <h3>Posts by Category</h3>
        <button
          className={blogCategoriesListStyles.caret}
          aria-expanded={isOpen}
          type="button"
          onClick={() => setisOpen(!isOpen)} // toggle
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M5.59523 6.56387C5.7446 6.71053 5.91203 6.7381 6.0001 6.7381C6.09838 6.7381 6.25421 6.71136 6.40443 6.56387L10.9015 1.76778C11.1074 1.5483 11.093 1.20669 10.8695 1.00471C10.6459 0.802637 10.298 0.817297 10.0924 1.03625L5.99993 5.40006L1.90754 1.03625C1.70151 0.816664 1.35357 0.802742 1.13034 1.00471C0.906907 1.20669 0.892512 1.5483 1.09823 1.76778L5.59523 6.56387Z" />
          </svg>
          <span className="a11y-only">todo hide/show categories</span>
        </button>
      </div>
      {isOpen && (
        <ul
          role="navigation"
          aria-label="Categories"
          className={blogCategoriesListStyles.categoryList}
        >
          {categories.map(category => (
            <li
              className={blogCategoriesListStyles.category}
              key={category.slug}
            >
              <Link to={category.slug}>
                {category.name} ({category.blog_post.length})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
