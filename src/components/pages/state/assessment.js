import React from 'react'

const Assessment = ({ assessments }) => (
  <>
    <h2 id="key-metrics">Key metrics</h2>
    <ul>
      {assessments
        .filter(item => item.category === 'Testing and Outcomes')
        .map(assessment => (
          <li>The state {assessment.text}</li>
        ))}
    </ul>
    <h2 id="race-ethnicity">Race and Ethnicity</h2>
    <ul>
      {assessments
        .filter(item => item.category === 'Race and Ethnicity')
        .map(assessment => (
          <li>The state {assessment.text}</li>
        ))}
    </ul>
    <h2 id="long-term-care">Long-term care</h2>
    <ul>
      {assessments
        .filter(item => item.category === 'Long-Term Care')
        .map(assessment => (
          <li>The state {assessment.text}</li>
        ))}
    </ul>
  </>
)

export default Assessment
