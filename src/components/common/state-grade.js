import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/common/state-grade.scss'
import gradeA from '../../images/state-grades/grade-a.svg'
import gradeB from '../../images/state-grades/grade-b.svg'
import gradeC from '../../images/state-grades/grade-c.svg'
import gradeD from '../../images/state-grades/grade-d.svg'
import gradeF from '../../images/state-grades/grade-f.svg'
import gradeNA from '../../images/state-grades/grade-na.svg'

const StateGrade = ({ letterGrade }) => {
  const svgElement = function(grade) {
    switch (grade) {
      case 'A':
        return <img src={gradeA} alt="Grade A" width="28px" />
      case 'B':
        return <img src={gradeB} alt="Grade B" width="28px" />
      case 'C':
        return <img src={gradeC} alt="Grade C" width="28px" />
      case 'D':
        return <img src={gradeD} alt="Grade D" width="28px" />
      case 'F':
        return <img src={gradeF} alt="Grade F" width="28px" />
      default:
        return <img src={gradeNA} alt="No grade" width="28px" />
    }
  }

  return (
    <p className="state-grade">
      <span>
        Current <Link to="about-data#data-quality-grade">data grade</Link>:
      </span>
      <div title={`Grade ${letterGrade || 'not available'}`}>
        {svgElement(letterGrade)}
      </div>
    </p>
  )
}

export default StateGrade
