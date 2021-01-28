import React, { Fragment } from 'react'
import classnames from 'classnames'

import Tooltip from '~components/common/tooltip'
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

const MetricSelector = ({
  currentMetric,
  setCurrentMetric,
  metrics,
  stateName,
}) => {
  return (
    <div className={styles.toggle} role="radiogroup">
      {Object.keys(metrics).map(option => (
        <Fragment key={option}>
          {!metrics[option].available ? (
            <Tooltip
              label={
                <span>
                  {stateName} does not report race/ethnicity data for{' '}
                  {option.toLocaleLowerCase()}.
                </span>
              }
            >
              <div className={styles.unavailableWrapper}>
                <MetricButton
                  option={option}
                  metrics={metrics}
                  state={currentMetric}
                  setState={setCurrentMetric}
                >
                  <img
                    src={alertBang}
                    alt={`${option} data is unavailable.`}
                    className={styles.bang}
                  />
                  <span>{option}</span>
                </MetricButton>
              </div>
            </Tooltip>
          ) : (
            <MetricButton
              option={option}
              metrics={metrics}
              state={currentMetric}
              setState={setCurrentMetric}
            >
              <span>{option}</span>
            </MetricButton>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default MetricSelector
