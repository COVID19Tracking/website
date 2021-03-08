import React from 'react'

import Container from '~components/common/container'

import SocialSharing from '~components/common/social-sharing'
import StateCombobox from '~components/common/state-combobox'

import styles from './sticky-nav.module.scss'

const StickyNav = ({ stateName, stateSlug, allStates }) => (
  <div className={styles.container}>
    <Container centered className={styles.containerInner}>
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
          stateList={allStates.sort((a, b) => (a.name < b.name ? -1 : 1))}
          labelText="View another state’s data"
          linkFunction={state =>
            `/data/state/${state.childSlug.slug}/race-ethnicity/`
          }
        />
      </div>
    </Container>
  </div>
)

export default StickyNav
