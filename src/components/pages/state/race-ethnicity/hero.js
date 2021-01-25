import React from 'react'

import MetricSelector from './metric-selector'
import NotesAndDownloads from './notes-and-downloads'

import styles from './hero.module.scss'

const getMetrics = allData => {
  /**
   * Identifies all of the available metrics (tests, hosp,
   * deaths, cases) for a given state
   * */
  const latestDay = allData[0]
  const nonNullValues = []

  Object.keys(latestDay).forEach(key => {
    if (latestDay[key] != null) {
      nonNullValues.push(key)
    }
  })

  const metrics = {
    Tests: {
      available: false,
    },
    Cases: {
      available: false,
    },
    Hosp: {
      available: false,
    },
    Deaths: {
      available: false,
    },
  }

  const checkValue = (value, prefix) => {
    /**
     * Check if a value is actually reported by the state (true)
     * or just an 'Unknown' or 'Total' value from CTP (false).
     */
    if (
      value.startsWith(prefix) &&
      !value.endsWith('Unknown') &&
      !value.endsWith('_per100k') &&
      !value.endsWith('Total')
    ) {
      return true
    }
    return false
  }

  nonNullValues.every(value => {
    if (checkValue(value, 'Cases_')) {
      metrics.Cases.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Deaths_')) {
      metrics.Deaths.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Hosp_')) {
      metrics.Hosp.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Tests_')) {
      metrics.Tests.available = true
      return false
    }
    return true
  })

  return metrics
}

const getFirstAvailableMetric = metrics => {
  /**
   * Gets the first available metric for the state.
   * Used to set the default state for the metric selector.
   */
  let firstMetric
  Object.keys(metrics).every(metric => {
    if (metrics[metric].available) {
      firstMetric = metric
      return false // break
    }
    return true
  })
  return firstMetric
}

const Hero = ({
  stateName,
  stateSlug,
  stateAbbreviation,
  currentMetric,
  setCurrentMetric,
  timeSeriesData,
  combinedNotes,
  separateNotes,
}) => {
  const metrics = getMetrics(timeSeriesData)
  setCurrentMetric(getFirstAvailableMetric(metrics))

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector
          state={currentMetric}
          setState={setCurrentMetric}
          metrics={metrics}
        />
        <NotesAndDownloads
          slug={stateSlug}
          stateAbbreviation={stateAbbreviation}
          stateName={stateName}
          combinedData={combinedNotes}
          separateData={separateNotes}
        />
      </div>
    </div>
  )
}

export default Hero
