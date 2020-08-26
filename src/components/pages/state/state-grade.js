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

import gradeLargeAPlus from '~images/state-grades/large/a-plus.svg'
import gradeLargeA from '~images/state-grades/large/a.svg'
import gradeLargeB from '~images/state-grades/large/b.svg'
import gradeLargeC from '~images/state-grades/large/c.svg'
import gradeLargeD from '~images/state-grades/large/d.svg'
import gradeLargeF from '~images/state-grades/large/f.svg'
import gradeLargeNA from '~images/state-grades/large/na.svg'

const grades = {
  'a+': {
    small: gradeSmallAPlus,
    large: gradeLargeAPlus,
  },
  a: {
    small: gradeSmallA,
    large: gradeLargeA,
  },
  b: { small: gradeSmallB, large: gradeLargeB },
  c: {
    small: gradeSmallC,
    large: gradeLargeC,
  },
  d: {
    small: gradeSmallD,
    large: gradeLargeD,
  },

  f: { small: gradeSmallF, large: gradeLargeF },
  na: { small: gradeSmallNA, large: gradeLargeNA },
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
            ? grades[letterGrade.toLowerCase()].small
            : grades.na.small
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
        ? grades[letterGrade.toLowerCase()].large
        : grades.na.large
    }
    alt={`Grade ${letterGrade}`}
    className={stateGradeStyle.gradeLarge}
  />
)

export { StateGrade, LargeStateGrade }
