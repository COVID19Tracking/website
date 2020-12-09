import React from 'react'

import styles from './radio-toggle.module.scss'

const RadioToggle = ({ options, state, setState }) => {
  return (
    <div className={styles.toggle} role="radiogroup">
      <button
        className={!state && styles.active}
        title={options[0]}
        aria-checked={!state}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          if (state) {
            setState(false)
          }
        }}
        role="radio"
        type="button"
      >
        {options[0]}
      </button>
      <button
        className={state ? styles.active : undefined}
        title={options[1]}
        aria-checked={state}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          if (!state) {
            setState(true)
          }
        }}
        role="radio"
        type="button"
      >
        {options[1]}
      </button>
    </div>
  )
}

export default RadioToggle
