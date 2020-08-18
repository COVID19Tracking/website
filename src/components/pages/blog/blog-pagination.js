import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import Container from '~components/common/container'

import doubleCaret from '~images/icons/double-caret.svg'
import doubleCaretInactive from '~images/icons/double-caret-inactive.svg'

import blogPaginationStyle from './blog-pagination.module.scss'

export default ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? '/blog'
      : `/blog/page/${(currentPage - 1).toString()}`
  const nextPage = `/blog/page/${(currentPage + 1).toString()}`

  const inactivePrev = isFirst ? blogPaginationStyle.inactiveLink : ''
  const inactiveNext = isLast ? blogPaginationStyle.inactiveLink : ''

  return (
    <Container className={blogPaginationStyle.navigationContainer}>
      <div className={blogPaginationStyle.navigation}>
        {inactivePrev ? (
          <Link
            to={prevPage}
            rel="prev"
            className={classnames(
              inactivePrev,
              blogPaginationStyle.navigationItem,
            )}
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
        {inactiveNext ? (
          <Link
            to={nextPage}
            rel="next"
            className={classnames(
              inactiveNext,
              blogPaginationStyle.navigationItem,
            )}
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
    </Container>
  )
}
