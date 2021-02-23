import React from 'react'

import HistoricalRaceDataSmallCard from '~components/pages/data/cards/small/historical-race-data'

import styles from './small-cards.module.scss'

const DashboardSmallCards = ({ stateSlug, stateAbbreviation }) => (
  <div className={styles.container}>
    <HistoricalRaceDataSmallCard
      stateSlug={stateSlug}
      stateAbbreviation={stateAbbreviation}
    />
  </div>
)

export default DashboardSmallCards
