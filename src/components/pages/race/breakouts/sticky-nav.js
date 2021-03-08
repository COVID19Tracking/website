import React from 'react'

import SocialSharing from '~components/common/social-sharing'
import StateCombobox from '~components/common/state-combobox'

import styles from './sticky-nav.module.scss'

const StickyNav = ({ stateName, stateSlug, allStates }) => (
  <div className={styles.container}>
    <div>
      <h5>
        Share <strong>{stateName}’s</strong> page:
      </h5>
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        url={`https://covidtracking.com/data/state/${stateSlug}/race-ethnicity/`}
        // text={} todo choose text
      />
    </div>
    <div className={styles.sticky}>
      <StateCombobox
        // todo break out the combobox and label from the state-nav component
        stateList={allStates.sort((a, b) => (a.name < b.name ? -1 : 1))}
        labelText="View another state’s data"
      />
    </div>
  </div>
)

export default StickyNav
