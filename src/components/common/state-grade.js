import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/common/state-grade.scss'
import gradeA from '../../images/state-grades/grade-a.svg'
import gradeB from '../../images/state-grades/grade-b.svg'
import gradeC from '../../images/state-grades/grade-c.svg'
import gradeD from '../../images/state-grades/grade-d.svg'
import gradeF from '../../images/state-grades/grade-f.svg'
import gradeNA from '../../images/state-grades/grade-na.svg'

const StateGrade = ({ letterGrade = 'na' }) => {
  const grades = {
    a: gradeA,
    b: gradeB,
    c: gradeC,
    d: gradeD,
    f: gradeF,
    na: gradeNA,
  }

  return (
    <p className="state-grade">
      <span>
        Current <Link to="/about-data#data-quality-grade">data grade</Link>:
      </span>
      <img
        src={
          letterGrade &&
          typeof grades[letterGrade.toLowerCase()] !== 'undefined'
            ? grades[letterGrade.toLowerCase()]
            : grades.na
        }
        alt={`Grade ${letterGrade}`}
        width="28px"
      />
    </p>
  )
}

export default StateGrade
