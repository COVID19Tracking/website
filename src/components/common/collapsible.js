import React, { useState } from 'react'

import styles from './collapsible.module.scss'

const Collapsible = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleIsCollapsed = () => {
    setIsCollapsed(prev => !prev)
  }

  const CollapseButton = ({ collapsed, toggle }) => (
    <button type="button" onClick={toggle} className={styles.collapseButton}>
      <span>Collapse</span> {collapsed ? '↓' : '↑'}
    </button>
  )
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div>
          <CollapseButton toggle={toggleIsCollapsed} collapsed={isCollapsed} />
        </div>
      </div>
      {!isCollapsed && <div className={styles.content}>{children}</div>}
    </div>
  )
}

export default Collapsible
