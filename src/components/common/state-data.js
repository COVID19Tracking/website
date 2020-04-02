import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import slug from '../../utilities/slug'
import { UnstyledList } from './lists'
import SummaryTable from './summary-table'

const State = ({ state }) => (
  <>
    <h3>
      <Link to={`/data/state/${slug(state.name)}`} id={`state-${state.state}`}>
        {state.name}
      </Link>
    </h3>
    <SummaryTable data={state.stateData} />
    <UnstyledList>
      {state.twitter && (
        <li>
          <a href={`https://twitter.com/${state.twitter}`}>
            {state.name} on Twitter
          </a>
        </li>
      )}
      {state.covid19Site && (
        <li>
          <a href={state.covid19Site}>
            Best current data source for {state.name}
          </a>
        </li>
      )}
      <li>
        <Link to={`/data/state/${slug(state.name)}#historical`}>
          Historical data for {state.name}
        </Link>
      </li>
      {state.stateData.grade && (
        <li>
          Data quality grade:{' '}
          <span className="state-grade">{state.stateData.grade}</span>
        </li>
      )}
    </UnstyledList>
    {state.notes && (
      <div
        dangerouslySetInnerHTML={{
          __html: marked(state.notes),
        }}
      />
    )}
    <a className="top-link" href="#states-top" title="top">
      ↑ (return to top)
    </a>
  </>
)

export default State
