/* eslint-disable no-debugger */

import React from 'react'

import styles from './tooltip.module.scss'

const rightBuffer = 250

const Tooltip = ({ top, left, children }) => {
  let x = left
  if (window.innerWidth < left + rightBuffer) {
    x -= left + rightBuffer - window.innerWidth
  }

  return (
    <div style={{ top, left: x }} className={styles.root}>
      {children}
    </div>
  )
}

export default Tooltip
