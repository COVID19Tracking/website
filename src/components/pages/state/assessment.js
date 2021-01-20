import React from 'react'

const Assessment = ({ assessments }) => (
  <>
    <h2>Key metrics</h2>
    <ul>
      {assessments.map(assessment => (
        <li>The state {assessment.text}</li>
      ))}
    </ul>
  </>
)

export default Assessment
