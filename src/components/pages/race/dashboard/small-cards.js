import React from 'react'

import CrdtBreakoutSmallCard from '~components/pages/data/cards/small/crdt-breakout-small-card'
import styles from './small-cards.module.scss'

const DashboardSmallCards = ({ stateSlug, stateAbbreviation }) => (
  <div className={styles.container}>
    <CrdtBreakoutSmallCard
      stateSlug={stateSlug}
      stateAbbreviation={stateAbbreviation}
    />
  </div>
)

export default DashboardSmallCards
