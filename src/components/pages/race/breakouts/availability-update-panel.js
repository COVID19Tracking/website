import React from 'react'
import Percent from '~components/pages/race/dashboard/percent'
import styles from './hero.module.scss'
import LastUpdated from './last-updated'

const AvailabilityNote = ({ core, testHosp, combined }) => {
  const Availability = ({ value, title }) => (
    <span>
      <Percent number={value} /> {title}
    </span>
  )

  if (combined) {
    return (
      <div className={styles.availabilityWrapper}>
        <p>Race/ethnicity data available for:</p>
        <div className={styles.availabilityGrid}>
          <Availability
            value={parseFloat(core.knownRaceEthPos)}
            title="Cases"
          />
          <Availability
            value={parseFloat(core.knownRaceEthDeath)}
            title="Deaths"
          />
          <Availability
            value={parseFloat(testHosp.knownRaceEthTest)}
            title="Tests"
          />
          <Availability
            value={parseFloat(testHosp.knownRaceEthHosp)}
            title="Hospitalizations"
          />
        </div>
      </div>
    )
  }
  return (
    <div className={styles.availabilityWrapper}>
      <p>Race data available for:</p>
      <div className={styles.availabilityGrid}>
        <Availability value={parseFloat(core.knownRacePos)} title="Cases" />
        <Availability value={parseFloat(core.knownRaceDeath)} title="Deaths" />
        <Availability
          value={parseFloat(testHosp.knownRaceTest)}
          title="Tests"
        />
        <Availability
          value={parseFloat(testHosp.knownRaceHosp)}
          title="Hospitalizations"
        />
      </div>
      <p>Ethnicity data available for:</p>
      <div className={styles.availabilityGrid}>
        <Availability value={parseFloat(core.knownEthPos)} title="Cases" />
        <Availability value={parseFloat(core.knownEthDeath)} title="Deaths" />
        <Availability value={parseFloat(testHosp.knownEthTest)} title="Tests" />
        <Availability
          value={parseFloat(testHosp.knownEthHosp)}
          title="Hospitalizations"
        />
      </div>
    </div>
  )
}

const AvailabilityUpdatePanel = ({
  coreData,
  testHospData,
  isCombined,
  lastUpdatedByState,
  lastCheckedByCtp,
}) => {
  return (
    <div className={styles.secondary}>
      <AvailabilityNote
        core={coreData}
        testHosp={testHospData}
        combined={isCombined}
      />
      <LastUpdated
        lastCheckedByCtp={lastCheckedByCtp}
        lastUpdatedByState={lastUpdatedByState}
      />
    </div>
  )
}

export default AvailabilityUpdatePanel
