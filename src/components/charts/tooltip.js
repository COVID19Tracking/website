import React from 'react'

import styles from './tooltip.module.scss'

const rightBuffer = 250

const Tooltip = ({ x, y, children }) => {
  let left = x

  if (window.innerWidth < x + rightBuffer) {
    left -= x + rightBuffer - window.innerWidth
  }

  return (
    <div style={{ top: y, left }} className={styles.root}>
      {children}
    </div>
  )
}

export default Tooltip
