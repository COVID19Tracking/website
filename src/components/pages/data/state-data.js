import React, { useState } from 'react'
import { Link } from 'gatsby'
import StateSummary from '~components/pages/data/summary'
import StateNotes from '~components/pages/state/state-notes'
import LastUpdated from '~components/common/last-updated'
import {
  StateLinksDisclosure,
  StateLinksDisclosureButton,
  StateLinksDisclosurePanel,
} from '~components/pages/state/state-links'

import stateDataStyles from './state-data.module.scss'

const State = ({ state, metadata }) => {
  const [stateLinksOpen, setStateLinksOpen] = useState(false)
  const { slug } = state.childSlug
  return (
    <>
      <div className={`state-header ${stateDataStyles.header}`}>
        <h3 id={`state-${state.state.toLowerCase()}`}>
          <Link to={`/data/state/${slug}`}>{state.name}</Link>
        </h3>
      </div>
      <StateSummary
        stateName={state.name}
        stateAbbreviation={state.state}
        stateSlug={slug}
        data={state.stateData}
        sevenDaysAgo={state.sevenDaysAgo}
        metadata={metadata}
        raceData={state.raceData}
        lastUpdate={state.dateModified}
        longTermCare={state.childLtc}
        annotations={state.annotations}
        hhsHospitalization={
          state.hhsHospitalization && state.hhsHospitalization.nodes[0]
        }
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

      {state.notes && <StateNotes notes={state.notes} />}
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
