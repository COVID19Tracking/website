import React from 'react'
import { Link } from 'gatsby'
import StateGrade from '~components/pages/state/state-grade'
import Timezone from '~components/common/timezone'
import preambleStyle from './preamble.module.scss'
import { Row, Col } from '~components/common/grid'

const StatePreamble = ({
  state,
  covidState,
  assessment,
  assessmentDate,
  hideNotesLink = false,
}) => {
  // todo make state grade wrap as a circle with the grade description
  return (
    <div className={preambleStyle.preamble}>
      <Row>
        <Col width={[4, 6, 6]}>
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
            <li>
              Last updated {covidState.dateModified} <Timezone />
            </li>
          </ul>
        </Col>
        <Col width={[4, 6, 6]}>
          {assessment && (
            <StateGrade
              assessment={assessment}
              slug={state.childSlug.slug}
              date={assessmentDate}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default StatePreamble
