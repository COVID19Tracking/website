import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import styles from './collapsible-section.module.scss'

const Collapsible = ({ title, children, open = true }) => {
  const [isOpen, setIsOpen] = useState(open)

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev)
  }

  const CollapseButton = ({ openStatus, toggle }) => (
    <DisclosureButton
      type="button"
      onClick={toggle}
      className={styles.collapseButton}
    >
      <span>{openStatus ? 'Collapse' : 'Open'}</span> {openStatus ? '↑' : '↓'}
    </DisclosureButton>
  )
  return (
    <Disclosure open={isOpen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <div>
            <CollapseButton toggle={toggleIsOpen} openStatus={isOpen} />
          </div>
        </div>
        <DisclosurePanel className={styles.content}>{children}</DisclosurePanel>
      </div>
    </Disclosure>
  )
}

export default Collapsible
