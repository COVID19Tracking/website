import React from 'react'
import { Link } from 'gatsby'
import StateGrade from '~components/pages/state/state-grade'
import { DownloadDataRow } from '~components/pages/state/download-data'
import preambleStyle from './preamble.module.scss'

const StatePreamble = ({ state, covidState }) => {
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.preamble}>
      <h2 className={preambleStyle.header}>{state.name} Data Sources</h2>
      <ul>
        <li>
          <Link to={`/data/state/${state.childSlug.slug}/notes`}>
            What you need to know about this data
          </Link>
        </li>
        <li>
          <a
            className={preambleStyle.screenshots}
            rel="noreferrer"
            target="_blank"
            href={`https://screenshots.covidtracking.com/${state.childSlug.slug}`}
          >
            <span>Sources and screenshots</span>
          </a>
        </li>
      </ul>
      <DownloadDataRow
        slug={state.childSlug.slug}
        lastUpdateEt={covidState.dateModified}
      >
        <StateGrade letterGrade={covidState.dataQualityGrade} />
      </DownloadDataRow>
    </div>
  )
}

export default StatePreamble
