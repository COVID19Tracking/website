import React, { useState } from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import styles from './sources.module.scss'

const Sources = ({ data }) => {
  const [isDisclosureOpen, setDisclosureOpen] = useState(false)

  return (
    <div>
      <Disclosure
        open={isDisclosureOpen}
        onChange={() => setDisclosureOpen(!isDisclosureOpen)}
      >
        <DisclosureButton className={styles.title}>
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
          <ol className={styles.sourceList}>
            {[
              data.sourcePrimary,
              data.sourceSecondary,
              data.sourceTertiary,
              data.sourceQuaternary,
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
