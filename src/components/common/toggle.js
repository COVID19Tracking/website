import React from 'react'

import styles from './toggle.module.scss'

export default ({ options, state, setState }) => {
  const toggleState = () => setState(!state)
  return (
    <div
      className={styles.toggle}
      onClick={toggleState}
      onKeyPress={toggleState}
      role="switch"
      aria-checked={state}
      tabIndex={0}
    >
      <span className={!state && styles.active}>{options[0]}</span>
      <span className={state && styles.active}>{options[1]}</span>
    </div>
  )
}
