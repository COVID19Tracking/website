import React from 'react'
import { getGroups } from '~components/pages/race/breakouts/bar-chart/utils'
import { FormatDate } from '~components/utils/format'

import styles from './cumulative-notes.module.scss'

const CumulativeNotes = ({
  availableMetrics,
  state,
  testHospData,
  lastUpdated,
  worstDeathsAsterisk,
}) => {
  let metrics = availableMetrics

  // Remove deaths metric if worstDeathsAsterisk
  if (worstDeathsAsterisk) {
    metrics = metrics.filter(metric => metric !== 'deaths')
  }

  const groups = getGroups(state, testHospData)
  if (Object.keys(groups).length === 0) {
    // Handle cases like Guam w/o per capita data
    return null
  }
  const { worstMetrics } = groups
  const metricVerbs = {
    tests: 'been tested for',
    cases: 'contracted',
    hospitalizations: 'been hospitalized with',
    deaths: 'died from',
  }
  return (
    <div className={styles.container}>
      <h4 className={styles.header}>Cumulative Per Capita Data</h4>
      <p>
        In {state.name}, through{' '}
        <FormatDate date={lastUpdated} format="LLLL d, yyyy" />:
      </p>
      <ul>
        {metrics.map(metric => (
          <li>
            {worstMetrics[metric].group} were most likely to have{' '}
            {metricVerbs[metric]} COVID-19
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CumulativeNotes
