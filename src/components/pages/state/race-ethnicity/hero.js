import React, { useEffect } from 'react'

import { isCombined } from './utils'
import { NotesAndDownloads } from './notes-and-downloads'
import Sources from './sources'

import styles from './hero.module.scss'
import SelectorAndCharts from './selector-and-charts'
import { getMetrics } from './charts'

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
  const metrics = getMetrics(completeTimeSeriesData)

  useEffect(() => {
    // Set the current metric to the first available
    // metric only once.
    setCurrentMetric(getFirstAvailableMetric(metrics))
  }, [])

  const stateIsCombined = isCombined(combinedNotes, separateNotes)
  const lastReportedByState = (stateIsCombined ? combinedNotes : separateNotes)
    .stateUpdate.value

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <SelectorAndCharts
          stateIsCombined={stateIsCombined}
          lastReportedByState={lastReportedByState}
          stateName={stateName}
          currentMetric={currentMetric}
          setCurrentMetric={setCurrentMetric}
          asOfDate={timeSeriesData[0].Date}
          completeTimeSeriesData={completeTimeSeriesData}
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
