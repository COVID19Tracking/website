import React from 'react'

import MetricSelector from './metric-selector'
import RatesToggle from './rates-toggle'
import Charts from './charts'
import NotesAndDownloads from './notes-and-downloads'

import styles from './hero.module.scss'

const Hero = ({
  currentMetric,
  setCurrentMetric,
  usePer100kRate,
  setUsePer100kRate,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector state={currentMetric} setState={setCurrentMetric} />
        <RatesToggle
          state={usePer100kRate}
          setState={setUsePer100kRate}
          className={styles.ratesToggle}
        />
        <Charts />
        {/** todo remove hardcoded NM values */}
        <NotesAndDownloads
          slug="new-mexico"
          stateAbbreviation="NM"
          stateName="New Mexico"
        />
      </div>
    </div>
  )
}

export default Hero
