import React from 'react'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import { StateGrade } from '~components/pages/state/state-grade'
import StateSummary from '~components/common/summary'
import StateNotes from '~components/pages/state/state-notes'
import stateDataStyles from './state-data.module.scss'

// todo pass race and ethnicity data from API
const State = ({ state }) => (
  <>
    <div className={`state-header ${stateDataStyles.header}`}>
      <h3 id={`state-${state.state.toLowerCase()}`}>
        <Link to={`/data/state/${slug(state.name)}`}>{state.name}</Link>
      </h3>
      <StateGrade letterGrade={state.stateData.dataQualityGrade} />
    </div>
    <StateSummary
      stateSlug={slug(state.name)}
      data={state.stateData}
      sevenDaysAgo={state.sevenDaysAgo}
      raceData={{
        combined: false,
        separate: false,
      }}
      lastUpdated={state.lastUpdateEt}
    />
    {state.notes && <StateNotes notes={state.notes} />}
    <a
      className={`state-top-link ${stateDataStyles.topLink}`}
      href="#reach-skip-nav"
      title="top"
    >
      Back to top.
    </a>
  </>
)

export default State
