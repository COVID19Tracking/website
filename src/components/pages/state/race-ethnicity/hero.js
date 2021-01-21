import React from 'react'

import MetricSelector from './metric-selector'
import Charts from './charts'
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

  nonNullValues.every(value => {
    if (value.startsWith('Cases_')) {
      metrics.Cases.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Deaths_')) {
      metrics.Deaths.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Hosp_')) {
      metrics.Hosp.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Tests_')) {
      metrics.Tests.available = true
      return false
    }
    return true
  })

  return metrics
}

const Hero = ({
  stateName,
  stateSlug,
  stateAbbreviation,
  currentMetric,
  setCurrentMetric,
  usePer100kRate,
  timeSeriesData,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector
          state={currentMetric}
          setState={setCurrentMetric}
          metrics={getMetrics(timeSeriesData)}
        />
        <Charts
          population={200000}
          usePer100kRate={usePer100kRate}
          timeSeriesData={timeSeriesData}
          currentMetric={currentMetric}
        />
        <NotesAndDownloads
          slug={stateSlug}
          stateAbbreviation={stateAbbreviation}
          stateName={stateName}
        />
      </div>
    </div>
  )
}

export default Hero
