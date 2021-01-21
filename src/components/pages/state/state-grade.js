import React from 'react'
import { Link } from 'gatsby'
import stateGradeStyle from './state-grade.module.scss'

const adjectives = {
  1: 'Serious',
  2: 'Some',
  3: 'Few',
}

const Grade = ({ grade, title, link }) => (
  <li>
    <span
      style={{
        background: (() => {
          const levels = { 1: 'red', 2: 'yellow', 3: 'green' }
          return levels[grade]
        })(),
        display: 'inline-block',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
      }}
    />
    <Link to={link}>{adjectives[grade]} issues exist</Link> for {title}
  </li>
)

const StateGrade = ({ slug, assessment }) => {
  return (
    <div className={stateGradeStyle.stateGrade}>
      <h2 className={stateGradeStyle.header}>
        Data quality{' '}
        <span className={stateGradeStyle.learnMore}>
          (
          <Link to="/">
            Learn more
            <span className="a11y-only"> about data quality assessments</span>
          </Link>
          )
        </span>
      </h2>
      <ul>
        <li>[TACO TK]</li>
        <Grade
          grade={assessment.crdt}
          title="Race and Ethnicity Data"
          link={`/data/state/${slug}/assessment#race-ethnicity`}
        />
        <li>[LTC TK]</li>
      </ul>
    </div>
  )
}

export default StateGrade
