import React from 'react'
import { Link } from 'gatsby'
import StateGrade from '~components/pages/state/state-grade'
import Timezone from '~components/common/timezone'
import preambleStyle from './preamble.module.scss'
import { Row, Col } from '~components/common/grid'

const StatePreamble = ({ state, covidState, hideNotesLink = false }) => {
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.preamble}>
      <h2 className={preambleStyle.header}>{state.name} Overview</h2>
      <ul>
        {!hideNotesLink && (
          <li>
            <Link to={`/data/state/${state.childSlug.slug}/notes`}>
              Notes, data anomalies, and official cautions for {state.name}
            </Link>
          </li>
        )}
        <li>
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://screenshots.covidtracking.com/${state.childSlug.slug}`}
          >
            <span>Data sources and screenshots for {state.name}</span>
          </a>
        </li>
      </ul>
      <Row>
        <Col width={[4, 6, 4]}>
          Last updated {covidState.dateModified} <Timezone />
        </Col>
        <Col width={[4, 6, 4]}>
          Download data as a{' '}
          <a href={`/data/download/${state.childSlug.slug}-history.csv`}>
            CSV file
          </a>{' '}
          or with our <Link to="/data/api">API</Link>.
        </Col>
        <Col width={[4, 6, 4]}>
          <StateGrade letterGrade={covidState.dataQualityGrade} />
        </Col>
      </Row>
    </div>
  )
}

export default StatePreamble
