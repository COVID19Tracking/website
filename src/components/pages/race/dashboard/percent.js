import React from 'react'
import percentStyles from './percent.module.scss'

export default ({ number, highlight }) => {
  if (number !== null) {
    let percentage = '0'
    if (Math.round(number * 100) > 0) {
      percentage = number * 100 > 1 ? Math.round(number * 100) : '<1'
    }
    return (
      <>
        {highlight ? (
          <span className={percentStyles.highlight}>{percentage}%</span>
        ) : (
          <>{percentage}%</>
        )}
      </>
    )
  }
  return <>–</>
}
