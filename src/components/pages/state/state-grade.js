import React from 'react'
import { Link } from 'gatsby'
import stateGradeStyle from './state-grade.module.scss'
import gradeSmallAPlus from '~images/state-grades/small/a-plus.svg'
import gradeSmallA from '~images/state-grades/small/a.svg'
import gradeSmallB from '~images/state-grades/small/b.svg'
import gradeSmallC from '~images/state-grades/small/c.svg'
import gradeSmallD from '~images/state-grades/small/d.svg'
import gradeSmallF from '~images/state-grades/small/f.svg'
import gradeSmallNA from '~images/state-grades/small/na.svg'

const grades = {
  'a+': gradeSmallAPlus,
  a: gradeSmallA,
  b: gradeSmallB,
  c: gradeSmallC,

  d: gradeSmallD,

  f: gradeSmallF,
  na: gradeSmallNA,
}

const StateGrade = ({ letterGrade = 'na' }) => {
  return (
    <p className={`state-grade ${stateGradeStyle.stateGrade}`}>
      <span>
        Current <Link to="/state-grades">data completeness grade</Link>:
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

export default StateGrade
