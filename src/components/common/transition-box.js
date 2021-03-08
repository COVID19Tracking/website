import React from 'react'
import { Link } from 'gatsby'
import transitionBoxStyle from './transition-box.module.scss'

const TransitionBox = ({ id, name, children }) => (
  <div className={transitionBoxStyle.box}>
    {children || (
      <>
        Starting <strong>March 7, 2021</strong> we are no longer collecting data
        for {name}.{' '}
        <Link to={`/about-data/data-summary#${id}`}>
          Learn about this dataset and alternative sources
        </Link>
        .
      </>
    )}
  </div>
)

export default TransitionBox
