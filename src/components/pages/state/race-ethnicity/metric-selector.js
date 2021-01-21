import React from 'react'
import classnames from 'classnames'

import alertBang from '~images/race-dashboard/alert-bang-orange.svg'

import styles from './metric-selector.module.scss'

const MetricSelector = ({ state, setState, metrics }) => {
  // todo collapse into list on mobile like blog categories
  // todo add popup for unavailable metrics

  return (
    <div className={styles.toggle} role="radiogroup">
      {Object.keys(metrics).map(option => (
        <button
          key={option}
          className={classnames(
            state === option ? styles.active : undefined,
            !metrics[option].available && styles.unavailable,
          )}
          title={option}
          aria-checked={state === option}
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            if (metrics[option].available) {
              setState(option)
            }
          }}
          role="radio"
          type="button"
          disabled={!metrics[option].available}
        >
          {!metrics[option].available && (
            <img
              src={alertBang}
              alt={`${option} data is unavailable.`}
              className={styles.bang}
            />
          )}
          <span>{option}</span>
        </button>
      ))}
    </div>
  )
}

export default MetricSelector
