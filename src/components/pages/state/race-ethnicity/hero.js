import React from 'react'
import MetricSelector from '~components/pages/state/race-ethnicity/metric-selector'
import RadioToggle from '~components/common/radio-toggle'

import styles from './hero.module.scss'

const Hero = ({
  currentMetric,
  setCurrentMetric,
  per100kToggle,
  setPer100kToggle,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <MetricSelector state={currentMetric} setState={setCurrentMetric} />
        <RadioToggle
          options={['Last 90 days', 'Historical']}
          state={per100kToggle}
          setState={setPer100kToggle}
        />
      </div>
    </div>
  )
}

export default Hero
