import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import slug from '../../utilities/slug'
import { UnstyledList } from './lists'
import StateGrade from './state-grade'
import SummaryTable from './summary-table'
import '../../scss/components/common/state-data.scss'

const State = ({ state }) => (
  <>
    <div className="state-header">
      <h3>
        <Link
          to={`/data/state/${slug(state.name)}`}
          id={`state-${state.state}`}
        >
          {state.name}
        </Link>
      </h3>
      <StateGrade letterGrade={state.stateData.grade} />
    </div>
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
