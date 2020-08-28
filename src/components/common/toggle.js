import React from 'react'

import styles from './toggle.module.scss'

const Toggle = ({ options, state, setState }) => {
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
      <span className={!state && styles.active} title={options[0]}>
        {options[0]}
      </span>
      <span className={state ? styles.active : undefined} title={options[1]}>
        {options[1]}
      </span>
    </div>
  )
}

export default Toggle
