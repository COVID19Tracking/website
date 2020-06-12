import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'
import { Link } from 'gatsby'
import slug from '~utilities/slug'
import { UnstyledList } from '~components/common/lists'
import StateGrade from '~components/pages/state/state-grade'
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
      lastUpdated={state.stateData.dateModified}
    />
    <UnstyledList>
      {state.twitter && (
        <li>
          <a href={`https://twitter.com/${state.twitter}`}>Official Twitter</a>
          <span>{'\u2022'}</span>
        </li>
      )}
      {state.covid19Site && (
        <>
          <li>
            <a href={state.covid19Site}>Official Data Source</a>
            <span>{'\u2022'}</span>
          </li>
        </>
      )}
      <li>
        <Link to={`/data/state/${slug(state.name)}#historical`}>
          Historical Data
        </Link>
      </li>
    </UnstyledList>
    {state.notes && (
      <div
        className={`module-content ${stateDataStyles.notes}`}
        dangerouslySetInnerHTML={{
          __html: smartypants(marked(state.notes)),
        }}
      />
    )}
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
