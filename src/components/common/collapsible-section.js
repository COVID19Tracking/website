import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import styles from './collapsible-section.module.scss'

const Collapsible = ({ title, children, open = true, isOpen, setIsOpen }) => {
  let [collapsibleIsOpen, setCollapsibleIsOpen] = useState(open)
  if (isOpen) {
    collapsibleIsOpen = isOpen
  }
  if (setIsOpen) {
    setCollapsibleIsOpen = setIsOpen
  }

  const toggleIsOpen = () => {
    setCollapsibleIsOpen(prev => !prev)
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
    <Disclosure open={collapsibleIsOpen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <div className={styles.buttonContainer}>
            <CollapseButton
              toggle={toggleIsOpen}
              openStatus={collapsibleIsOpen}
            />
          </div>
        </div>
        <DisclosurePanel className={styles.content}>{children}</DisclosurePanel>
      </div>
    </Disclosure>
  )
}

export default Collapsible
