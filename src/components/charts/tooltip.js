import React from 'react'

import styles from './tooltip.module.scss'

const Tooltip = ({ x, y, children }) => {
  return (
    <div style={{ top: y, left: x }} className={styles.root}>
      {children}
    </div>
  )
}

export default Tooltip
