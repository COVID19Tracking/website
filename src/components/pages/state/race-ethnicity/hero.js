import React from 'react'
import MetricSelector from '~components/pages/state/race-ethnicity/metric-selector'
import RatesToggle from '~components/pages/state/race-ethnicity/rates-toggle'

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
      </div>
    </div>
  )
}

export default Hero
