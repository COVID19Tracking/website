import React, { useEffect } from 'react'

import styles from './rates-toggle.module.scss'

const RatesToggle = ({ state, setState, currentMetric, noRates }) => {
  useEffect(() => {
    // Set the default selection to Total if noRates
    if (noRates) {
      setState(false)
    }
  }, [])
  return (
    <div className={styles.toggle} role="radiogroup">
      <button
        className={!state ? styles.active : ''}
        title={`Total ${currentMetric}`}
        aria-checked={!state}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          setState(false)
        }}
        role="radio"
        type="button"
      >
        <span>Total {currentMetric}</span>
      </button>
      {!noRates && (
        <button
          className={state ? styles.active : ''}
          title={`${currentMetric} Per 100k People`}
          aria-checked={state}
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            setState(true)
          }}
          role="radio"
          type="button"
        >
          <span>{currentMetric} Per 100k People</span>
        </button>
      )}
    </div>
  )
}

export default RatesToggle
