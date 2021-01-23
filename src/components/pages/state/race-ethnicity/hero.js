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

const isCombined = (combined, separate) => {
  /**
   * Identifies if a state reports racial data as combined or separate.
   */
  if (combined.length === 1) {
    return true
  }
  if (separate.length === 1) {
    return false
  }
  return null
}

const getNotes = (combined, separate) => {
  /**
   * Creates a list of notes for this state's data.
   */
  const notesObject = isCombined(combined, separate) ? combined[0] : separate[0]
  const notesList = Object.keys(notesObject)
    .map(note => {
      if (note !== null) {
        return notesObject[note]
      }
      return null
    })
    .filter(note => note != null)
  return notesList
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
  const notes = getNotes(combinedNotes, separateNotes)

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector
          state={currentMetric}
          setState={setCurrentMetric}
          metrics={getMetrics(timeSeriesData)}
        />
        <NotesAndDownloads
          slug={stateSlug}
          stateAbbreviation={stateAbbreviation}
          stateName={stateName}
          notesList={notes}
        />
      </div>
    </div>
  )
}

export default Hero
