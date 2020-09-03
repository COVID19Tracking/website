import React from 'react'
import percentStyles from './percent.module.scss'

const Percent = ({ number, highlight }) => {
  if (number === null || number === '') {
    return <>-</>
  }
  let percentage = '0'
  if (number > 0) {
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

export default Percent
