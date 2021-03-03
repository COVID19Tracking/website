import React from 'react'

import SocialSharing from '~components/common/social-sharing'
import styles from './sticky-nav.module.scss'

const StickyNav = ({ stateName, stateSlug }) => (
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
    <div>View another state’s data: [[searchbox]]</div>
  </div>
)

export default StickyNav
