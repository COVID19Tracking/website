import React from 'react'
import { Link } from 'gatsby'
import StateLinks from '~components/pages/state/state-links'
import StateGrade from '~components/pages/state/state-grade'
import StateNotes from '~components/pages/state/state-notes'
import SummaryTable from '~components/common/summary-table'
import stateDataStyles from './state-data.module.scss'

const State = ({ state }) => (
  <>
    <div className={`state-header ${stateDataStyles.header}`}>
      <h3 id={`state-${state.state.toLowerCase()}`}>
        <Link to={`/data/state/${state.childSlug.slug}`}>{state.name}</Link>
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
      fathomGoal="2YKBL0ZP"
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
