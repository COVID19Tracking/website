import React, { useEffect } from 'react'

import { isCombined } from './utils'
import MetricSelector from './metric-selector'
import NotesAndDownloads from './notes-and-downloads'
import DataAsOf from './data-as-of'
import Sources from './sources'
import Charts from './charts'

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
    Cases: {
      available: false,
    },
    Deaths: {
      available: false,
    },
    Tests: {
      available: false,
    },
    Hospitalizations: {
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
    if (checkValue(value, 'Hospitalizations_')) {
      metrics.Hospitalizations.available = true
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
  completeTimeSeriesData,
  combinedNotes,
  separateNotes,
  combinedTestHosp,
  separateTestHosp,
  stateSources,
}) => {
  const metrics = getMetrics(timeSeriesData)

  useEffect(() => {
    // Set the current metric to the first available
    // metric only once.
    setCurrentMetric(getFirstAvailableMetric(metrics))
  }, [])

  const lastReportedByState = (isCombined(combinedNotes, separateNotes)
    ? combinedNotes
    : separateNotes
  ).stateUpdate.value

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector
          currentMetric={currentMetric}
          setCurrentMetric={setCurrentMetric}
          metrics={metrics}
          stateName={stateName}
          asOfDate={
            <DataAsOf
              stateDate={lastReportedByState}
              ctpDate={timeSeriesData[0].Date}
            />
          }
        />
        <Charts
          timeSeriesData={completeTimeSeriesData}
          currentMetric={currentMetric}
        />
        <Sources data={stateSources} />
        <NotesAndDownloads
          slug={stateSlug}
          stateAbbreviation={stateAbbreviation}
          stateName={stateName}
          combinedData={combinedNotes}
          separateData={separateNotes}
          combinedTestHosp={combinedTestHosp}
          separateTestHosp={separateTestHosp}
        />
      </div>
    </div>
  )
}

export default Hero
