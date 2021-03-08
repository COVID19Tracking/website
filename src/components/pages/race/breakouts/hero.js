import React from 'react'

import Container from '~components/common/container'
import { GradeInner } from '~components/pages/state/state-grade'

import AvailabilityUpdatePanel from './availability-update-panel'
import StickyNav from './sticky-nav'

import rightCaret from '~images/icons/right-caret-dark.svg'
import styles from './hero.module.scss'

const Hero = ({
  stateName,
  stateSlug,
  coreData,
  testHospData,
  isCombined,
  assessment,
  lastUpdatedByCtp,
  allStates,
}) => {
  return (
    <>
      <div className={styles.container}>
        <Container centered>
          <div className={styles.breadcrumb}>
            <a href="/race/dashboard">State Dashboard</a>{' '}
            <img src={rightCaret} alt="" height="12px" />{' '}
            <span>{stateName}</span>
          </div>
          <h2>{stateName}</h2>
          <div className={styles.assessment}>
            <GradeInner
              grade={assessment}
              title="race and ethnicity data"
              link={`/data/state/${stateSlug}/assessment#long-term-care`}
            />
          </div>
          <AvailabilityUpdatePanel
            coreData={coreData}
            testHospData={testHospData}
            isCombined={isCombined}
            lastUpdatedByState={coreData.stateUpdate.value}
            lastCheckedByCtp={lastUpdatedByCtp}
          />
          <StickyNav
            stateName={stateName}
            stateSlug={stateSlug}
            allStates={allStates}
          />
        </Container>
      </div>
    </>
  )
}

export default Hero
