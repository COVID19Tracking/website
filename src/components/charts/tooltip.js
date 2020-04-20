import React from 'react'

import styles from './tooltip.module.scss'

const rightBuffer = 265

const Tooltip = ({ top, left, children }) => {
  let x = left
  if (window.innerWidth < left + rightBuffer) {
    x -= left + rightBuffer - window.innerWidth
  }
  if (left < 0) {
    x = 0
  }

  return (
    <div style={{ top, left: x }} className={styles.root}>
      {children}
    </div>
  )
}

export default Tooltip
