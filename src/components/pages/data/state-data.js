import React from 'react'
import { Link } from 'gatsby'
import LastUpdated from '~components/common/last-updated'
import StateSummary from '~components/pages/data/summary'

import stateDataStyles from './state-data.module.scss'

const State = ({ state, metadata }) => {
  const { slug } = state.childSlug
  return (
    <>
      <div className={`state-header ${stateDataStyles.header}`}>
        <h3 id={`state-${state.state.toLowerCase()}`}>
          <Link to={`/data/state/${slug}`}>{state.name}</Link>
        </h3>
        <LastUpdated date={state.stateData.dateModified} />
        <p>
          <Link to={`/data/state/${slug}`}>
            Full state data including data sources and notes
          </Link>
          .
        </p>
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
