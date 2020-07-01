import React from 'react'
import { Link } from 'gatsby'
import blogPaginationStyle from './blog-pagination.module.scss'

export default ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`

  const disabledPrev = isFirst ? blogPaginationStyle.disabledLink : ''
  const disableNext = isLast ? blogPaginationStyle.disabledLink : ''

  return (
    <div className={blogPaginationStyle.navigationContainer}>
      <div className={blogPaginationStyle.navigation}>
        <Link
          to={isFirst ? '/blog' : prevPage}
          rel="prev"
          className={`${disabledPrev} ${blogPaginationStyle.navigationItem}`}
        >
          ← Previous Page
        </Link>

        <Link
          to={isLast ? '/blog' : nextPage}
          rel="next"
          className={`${disableNext} ${blogPaginationStyle.navigationItem}`}
        >
          Next Page →
        </Link>
      </div>
      <div className={blogPaginationStyle.pageNavigation}>
        <p>Page:</p>
        <ul className={blogPaginationStyle.pages}>
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              className={blogPaginationStyle.page}
            >
              <Link
                to={`/blog/${i === 0 ? '' : i + 1}`}
                className={`${blogPaginationStyle.pageLink} ${
                  i + 1 === currentPage ? blogPaginationStyle.pageActive : ''
                }`}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
