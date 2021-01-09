import React from 'react'
import { Link } from 'gatsby'
import StateGrade from '~components/pages/state/state-grade'
import Timezone from '~components/common/timezone'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, covidState }) => {
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.preamble}>
      <h2 className={preambleStyle.header}>{state.name} Overview</h2>
      <ul>
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://screenshots.covidtracking.com/${state.childSlug.slug}`}
          >
            <span>Sources and screenshots</span>
          </a>
        </li>
        <li>
          <Link to={`/data/state/${state.childSlug.slug}/notes`}>
            What you need to know about this data
          </Link>
        </li>
        <li>
          <StateGrade letterGrade={covidState.dataQualityGrade} />
        </li>
        <li>
          Last updated {covidState.dateModified} <Timezone />
        </li>
        <li>
          Download data as a{' '}
          <a href={`/data/download/${state.childSlug.slug}-history.csv`}>
            CSV file
          </a>{' '}
          or with our <Link to="/data/api">API</Link>.
        </li>
      </ul>
    </div>
  )
}

export default StatePreamble
