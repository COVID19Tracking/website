import React from 'react'
import { Link } from 'gatsby'
import stateGradeStyle from './state-grade.module.scss'
import gradeAPlus from '~images/state-grades/grade-a-plus.svg'
import gradeA from '~images/state-grades/grade-a.svg'
import gradeB from '~images/state-grades/grade-b.svg'
import gradeC from '~images/state-grades/grade-c.svg'
import gradeD from '~images/state-grades/grade-d.svg'
import gradeF from '~images/state-grades/grade-f.svg'
import gradeNA from '~images/state-grades/grade-na.svg'

const grades = {
  'a+': gradeAPlus,
  a: gradeA,
  b: gradeB,
  c: gradeC,
  d: gradeD,
  f: gradeF,
  na: gradeNA,
}

const StateGrade = ({ letterGrade = 'na' }) => {
  return (
    <p className={`state-grade ${stateGradeStyle.stateGrade}`}>
      <span>
        Current <Link to="/state-grades">data quality grade</Link>:
      </span>
      <img
        src={
          letterGrade &&
          typeof grades[letterGrade.toLowerCase()] !== 'undefined'
            ? grades[letterGrade.toLowerCase()]
            : grades.na
        }
        className={stateGradeStyle.grade}
        alt={`Grade ${letterGrade}`}
      />
    </p>
  )
}

const LargeStateGrade = ({ letterGrade = 'na' }) => (
  <img
    src={
      letterGrade && typeof grades[letterGrade.toLowerCase()] !== 'undefined'
        ? grades[letterGrade.toLowerCase()]
        : grades.na
    }
    alt={`Grade ${letterGrade}`}
    className={stateGradeStyle.gradeLarge}
  />
)

export { StateGrade, LargeStateGrade }
