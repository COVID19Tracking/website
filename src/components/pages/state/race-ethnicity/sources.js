import React, { useState } from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import styles from './rates-toggle.module.scss'

const Sources = ({ data }) => {
  const [isDisclosureOpen, setDisclosureOpen] = useState(false)

  console.log(data)
  return (
    <div>
      <Disclosure
        open={isDisclosureOpen}
        onChange={() => setDisclosureOpen(!isDisclosureOpen)}
      >
        <DisclosureButton className={styles.disclosure}>
          Where this data comes from{' '}
          {isDisclosureOpen ? (
            <span className={styles.arrowUp} aria-hidden>
              ↑
            </span>
          ) : (
            <span className={styles.arrowDown} aria-hidden>
              ↓
            </span>
          )}
        </DisclosureButton>
        <DisclosurePanel>
          <ol>
            {[
              data.sourcePrimary,
              data.sourceSecondary,
              data.sourceTertiary,
            ].map(
              (source, index) =>
                source && (
                  <li key={source}>
                    <a href={source}>Source {index + 1}</a>
                  </li>
                ),
            )}
          </ol>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

export default Sources
