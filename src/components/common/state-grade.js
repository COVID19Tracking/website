import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/common/state-grade.scss'

const StateGrade = ({ letterGrade }) => (
  <p className="state-grade">
    <span>
      Current <Link to="about-data#data-quality-grade">data grade</Link>:
    </span>
    <div data-grade={letterGrade}>
      <span>{letterGrade || 'N/A'}</span>
    </div>
  </p>
)

export default StateGrade
