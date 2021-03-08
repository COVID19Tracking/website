import React from 'react'
import { getGroups } from '~components/social-media-graphics/race/utils'
import { FormatDate } from '~components/utils/format'

import styles from './cumulative-notes.module.scss'

const CumulativeNotes = ({
  availableMetrics,
  state,
  testHospData,
  lastUpdated,
}) => {
  const { worstMetrics } = getGroups(state, testHospData)
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
        <FormatDate date={lastUpdated} format="LLLL d yyyy" />:
      </p>
      <ul>
        {availableMetrics.map(metric => (
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
