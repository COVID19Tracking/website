import React from 'react'
import { Link } from 'gatsby'
import stateGradeStyle from './state-grade.module.scss'
import LastUpdatedLabel from '~components/pages/data/cards/last-updated-label'
import fewIcon from '~images/data-quality-icons/few-line.svg'
import someIcon from '~images/data-quality-icons/some-line.svg'
import majorIcon from '~images/data-quality-icons/major-line.svg'

const adjectives = {
  1: 'Serious',
  2: 'Some',
  3: 'Few',
}

const icons = {
  1: majorIcon,
  2: someIcon,
  3: fewIcon,
}

const Grade = ({ grade, title, link }) => (
  <li>
    <img
      className={stateGradeStyle.icon}
      aria-hidden
      alt=""
      src={icons[grade]}
    />
    <span>
      <Link to={link}>{adjectives[grade]} issues exist</Link> for {title}
    </span>
  </li>
)

const StateGrade = ({ slug, assessment, date }) => {
  return (
    <div className={stateGradeStyle.stateGrade}>
      <h2 className={stateGradeStyle.header}>
        Data Reporting Assessment{' '}
        <span className={stateGradeStyle.learnMore}>
          (
          <Link to={`/data/state/${slug}/assessment`}>
            Learn more
            <span className="a11y-only"> about data quality assessments</span>
          </Link>
          )
        </span>
      </h2>
      <ul className={stateGradeStyle.list}>
        <Grade
          grade={assessment.taco}
          title="state-level metrics"
          link={`/data/state/${slug}/assessment#state-metrics`}
        />
        <Grade
          grade={assessment.crdt}
          title="race and ethnicity data"
          link={`/data/state/${slug}/assessment#race-ethnicity`}
        />
        <Grade
          grade={assessment.ltc}
          title="long-term care data"
          link={`/data/state/${slug}/assessment#long-term-care`}
        />
      </ul>

      <LastUpdatedLabel date={date} label="Last updated" />
    </div>
  )
}

export default StateGrade

export { icons, adjectives }
