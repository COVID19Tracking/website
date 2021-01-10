import React from 'react'

import styles from './metric-selector.module.scss'

const MetricSelector = ({ state, setState }) => {
  const options = ['Tests', 'Cases', 'Hospitalizations', 'Deaths']

  // todo collapse into list on mobile like blog categories
  return (
    <div className={styles.toggle} role="radiogroup">
      {options.map(option => (
        <button
          className={state === option && styles.active}
          title={option}
          aria-checked={state === option}
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            setState(option)
          }}
          role="radio"
          type="button"
        >
          <span>{option}</span>
        </button>
      ))}
    </div>
  )
}

export default MetricSelector
