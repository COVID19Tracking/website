import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import styles from './collapsible.module.scss'

const Collapsible = ({ title, children, closed }) => {
  const [isCollapsed, setIsCollapsed] = useState(!closed)

  const toggleIsCollapsed = () => {
    setIsCollapsed(prev => !prev)
  }

  const CollapseButton = ({ collapsed, toggle }) => (
    <DisclosureButton
      type="button"
      onClick={toggle}
      className={styles.collapseButton}
    >
      <span>{collapsed ? 'Open' : 'Collapse'}</span> {collapsed ? '↓' : '↑'}
    </DisclosureButton>
  )
  return (
    <Disclosure open={isCollapsed}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <div>
            <CollapseButton
              toggle={toggleIsCollapsed}
              collapsed={isCollapsed}
            />
          </div>
        </div>
        <DisclosurePanel className={styles.content}>{children}</DisclosurePanel>
      </div>
    </Disclosure>
  )
}

export default Collapsible
