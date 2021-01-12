import React from 'react'

import MetricSelector from './metric-selector'
import RatesToggle from './rates-toggle'
import Charts from './charts'
import NotesAndDownloads from './notes-and-downloads'

import styles from './hero.module.scss'

const availableMetrics = allData => {
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

  const availableMetricTypes = []

  nonNullValues.every(value => {
    if (value.startsWith('Cases_')) {
      availableMetricTypes.push('Cases')
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Deaths_')) {
      availableMetricTypes.push('Deaths')
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Hosp_')) {
      availableMetricTypes.push('Hosp')
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (value.startsWith('Tests_')) {
      availableMetricTypes.push('Tests')
      return false
    }
    return true
  })

  return availableMetricTypes
}

const Hero = ({
  stateName,
  stateSlug,
  stateAbbreviation,
  currentMetric,
  setCurrentMetric,
  usePer100kRate,
  setUsePer100kRate,
  timeseriesData,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector
          state={currentMetric}
          setState={setCurrentMetric}
          availableMetrics={availableMetrics(timeseriesData)}
        />
        <RatesToggle
          state={usePer100kRate}
          setState={setUsePer100kRate}
          className={styles.ratesToggle}
        />
        <Charts
          population={200000}
          usePer100kRate={usePer100kRate}
          timeSeriesData={timeseriesData}
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
