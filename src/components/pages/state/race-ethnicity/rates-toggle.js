import React from 'react'

import styles from './rates-toggle.module.scss'

const RatesToggle = ({ state, setState }) => {
  return (
    <div className={styles.toggle} role="radiogroup">
      <button
        className={!state && styles.active}
        title="Cases"
        aria-checked={!state}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setState(false)
        }}
        role="radio"
        type="button"
      >
        <span>Cases</span>
      </button>
      <button
        className={state && styles.active}
        title="Cases Per 100k People"
        aria-checked={state}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setState(true)
        }}
        role="radio"
        type="button"
      >
        <span>Cases Per 100k People</span>
      </button>
    </div>
  )
}

export default RatesToggle
