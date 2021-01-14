import React from 'react'

import styles from './metric-selector.module.scss'

const MetricSelector = ({ state, setState, availableMetrics }) => {
  // todo collapse into list on mobile like blog categories
  return (
    <div className={styles.toggle} role="radiogroup">
      {availableMetrics.map(option => (
        <button
          key={option}
          className={state === option ? styles.active : undefined}
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
