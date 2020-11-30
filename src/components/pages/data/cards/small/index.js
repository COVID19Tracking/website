import React from 'react'
import { Link } from 'gatsby'
import smallCardStyles from './small-card.module.scss'

const SmallCard = ({ children, destination, isInternal = true }) => {
  if (isInternal) {
    return (
      <Link to={destination} className={smallCardStyles.wrapper}>
        <div className={smallCardStyles.container}>
          {children}
          <span className={smallCardStyles.arrow}>→</span>
        </div>
      </Link>
    )
  }
  return (
    <a href={destination} className={smallCardStyles.wrapper}>
      <div className={smallCardStyles.container}>
        {children}
        <span className={smallCardStyles.arrow}>→</span>
      </div>
    </a>
  )
}

const SmallCardIcon = ({ children }) => <>{children}</>

const SmallCardLink = ({ children }) => (
  <span className={smallCardStyles.link}>{children}</span>
)

export default SmallCard

export { SmallCard, SmallCardIcon, SmallCardLink }
