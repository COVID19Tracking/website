import React from 'react'
import classnames from 'classnames'

import alertBang from '~images/race-dashboard/alert-bang-orange.svg'

import styles from './metric-selector.module.scss'

const MetricButton = ({ children, option, metrics, state, setState }) => (
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
    {children}
  </button>
)

const MetricSelector = ({ state, setState, metrics }) => {
  return (
    <div className={styles.toggle} role="radiogroup">
      {Object.keys(metrics).map(option => (
        <>
          {!metrics[option].available ? (
            <MetricButton
              option={option}
              metrics={metrics}
              state={state}
              setState={setState}
            >
              <img
                src={alertBang}
                alt={`${option} data is unavailable.`}
                className={styles.bang}
              />
              <span>{option}</span>
            </MetricButton>
          ) : (
            <MetricButton
              option={option}
              metrics={metrics}
              state={state}
              setState={setState}
            >
              <span>{option}</span>
            </MetricButton>
          )}
        </>
      ))}
    </div>
  )
}

export default MetricSelector
