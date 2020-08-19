import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import StateLinks from '~components/pages/state/state-links'
import StateGrade from '~components/pages/state/state-grade'
import StateNotes from '~components/pages/state/state-notes'
import SummaryTable from '~components/common/summary-table'
import stateDataStyles from './state-data.module.scss'

const State = ({ state }) => (
  <>
    <div className={`state-header ${stateDataStyles.header}`}>
      <h3 id={`state-${state.state.toLowerCase()}`}>
        <Link to={`/data/state/${slug(state.name)}`}>{state.name}</Link>
      </h3>
      <StateGrade letterGrade={state.stateData.dataQualityGrade} />
    </div>
    <SummaryTable
      data={state.stateData}
      lastUpdated={state.stateData.lastUpdateEt}
    />
    <StateLinks
      twitter={state.twitter}
      covid19Site={state.covid19Site}
      covid19SiteSecondary={state.covid19SiteSecondary}
      stateName={state.name}
      historicalSlug={state.name}
    />
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

export default State
