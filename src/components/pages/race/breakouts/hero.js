import React from 'react'

import Percent from '~components/pages/race/dashboard/percent'
import Container from '~components/common/container'

import rightCaret from '~images/icons/right-caret-dark.svg'
import styles from './hero.module.scss'

const Hero = ({
  stateName,
  combinedData,
  separateData,
  combinedTestHosp,
  separateTestHosp,
}) => {
  const isCombined = combinedData !== null
  const coreData = isCombined ? combinedData : separateData
  const testHospData = isCombined ? combinedTestHosp : separateTestHosp

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
    if (!combined) {
      return (
        <div className={styles.availabilityWrapper}>
          <p>Race data available for:</p>
          <div className={styles.availabilityGrid}>
            <Availability value={parseFloat(core.knownRacePos)} title="Cases" />
            <Availability
              value={parseFloat(core.knownRaceDeath)}
              title="Deaths"
            />
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
            <Availability
              value={parseFloat(core.knownEthDeath)}
              title="Deaths"
            />
            <Availability
              value={parseFloat(testHosp.knownEthTest)}
              title="Tests"
            />
            <Availability
              value={parseFloat(testHosp.knownEthHosp)}
              title="Hospitalizations"
            />
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <Container centered>
        <div className={styles.breadcrumb}>
          <a href="/race/dashboard">State Dashboard</a>{' '}
          <img src={rightCaret} alt="" height="12px" /> <span>{stateName}</span>
        </div>
        <h2>{stateName}</h2>
        <p>Reporting assessment: TKTK</p>
        <div className={styles.secondary}>
          <AvailabilityNote
            core={coreData}
            testHosp={testHospData}
            combined={isCombined}
          />
          <div>Last updated</div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
