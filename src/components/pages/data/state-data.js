import React, { useState } from 'react'
import { Link } from 'gatsby'
import { StateGrade } from '~components/pages/state/state-grade'
import StateSummary from '~components/pages/data/summary'
import StateNotes from '~components/pages/state/state-notes'
import LastUpdated from '~components/common/last-updated'
import {
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
} from '~components/pages/state/state-links'

import stateDataStyles from './state-data.module.scss'

// todo pass race and ethnicity data from API
const State = ({ state, metadata }) => {
  const [stateLinksOpen, setStateLinksOpen] = useState(false)
  const { slug } = state.childSlug
  return (
    <>
      <div className={`state-header ${stateDataStyles.header}`}>
        <h3 id={`state-${state.state.toLowerCase()}`}>
          <Link to={`/data/state/${slug}`}>{state.name}</Link>
        </h3>
        <StateGrade letterGrade={state.stateData.dataQualityGrade} />
      </div>
      <StateSummary
        stateSlug={slug}
        data={state.stateData}
        sevenDaysAgo={state.sevenDaysAgo}
        raceData={{
          combined: false,
          separate: false,
        }}
        metadata={metadata}
        lastUpdate={state.dateModified}
      />

      <StateLinksDisclosure
        stateLinksAreOpen={stateLinksOpen}
        setStateLinksAreOpen={setStateLinksOpen}
      >
        <div className={stateDataStyles.stateLinksHeader}>
          <StateLinksDisclosureButton stateLinksAreOpen={stateLinksOpen} />
          <LastUpdated date={state.stateData.dateModified} />
        </div>
        <StateLinksDisclosurePanel state={state} />
      </StateLinksDisclosure>

      {state.notes && <StateNotes isNarrow={false} notes={state.notes} />}
      <a
        className={`state-top-link ${stateDataStyles.topLink}`}
        href="#reach-skip-nav"
        title="top"
        onClick={() => {
          if (typeof window.fathom !== 'undefined') {
            window.fathom.trackGoal('NM0I2PQP', 0)
          }
        }}
      >
        Back to top.
      </a>
    </>
  )
}

export default State
