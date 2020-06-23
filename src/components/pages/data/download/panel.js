import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import styles from './panel.module.scss'

export default ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Disclosure onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={styles.button}>
        <span>
          <strong>
            {label}{' '}
            <span aria-hidden className={styles.toggle}>
              {isOpen ? <>↑</> : <>↓</>}
            </span>
          </strong>
        </span>
      </DisclosureButton>
      <DisclosurePanel className={styles.panel}>{children}</DisclosurePanel>
    </Disclosure>
  )
}
