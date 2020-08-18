import React from 'react'
import { Link } from 'gatsby'
import blogPaginationStyle from './blog-pagination.module.scss'
import doubleCaret from '~images/icons/double-caret.svg'
import doubleCaretInactive from '~images/icons/double-caret-inactive.svg'

// todo use classnames

export default ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? '/blog'
      : `/blog/page/${(currentPage - 1).toString()}`
  const nextPage = `/blog/page/${(currentPage + 1).toString()}`

  const disabledPrev = isFirst ? blogPaginationStyle.disabledLink : ''
  const disableNext = isLast ? blogPaginationStyle.disabledLink : '' // todo add d to name

  return (
    <div className={blogPaginationStyle.navigationContainer}>
      <div className={blogPaginationStyle.navigation}>
        {disabledPrev ? (
          <Link
            to={prevPage}
            rel="prev"
            className={`${disabledPrev} ${blogPaginationStyle.navigationItem}`}
            aria-current={isFirst ? 'false' : 'step'}
          >
            <img src={doubleCaretInactive} alt="This is the first page." />
          </Link>
        ) : (
          <Link
            to={prevPage}
            rel="prev"
            className={blogPaginationStyle.navigationItem}
            aria-current={isFirst ? 'false' : 'step'}
          >
            <img src={doubleCaret} alt="Jump to the previous page." />
          </Link>
        )}
        Page {currentPage} of {numPages}
        {disableNext ? (
          <Link
            to={nextPage}
            rel="next"
            className={`${disableNext} ${blogPaginationStyle.navigationItem}`}
            aria-current={isLast ? 'false' : 'step'}
          >
            <img src={doubleCaretInactive} alt="This is the last page." />
          </Link>
        ) : (
          <Link
            to={nextPage}
            rel="next"
            className={blogPaginationStyle.navigationItem}
            aria-current={isLast ? 'false' : 'step'}
          >
            <img src={doubleCaret} alt="Jump to the next page." />
          </Link>
        )}
      </div>
    </div>
  )
}
