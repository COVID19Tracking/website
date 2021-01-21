import React from 'react'

const Assessment = ({ stateName, assessments }) => (
  <>
    <h2 id="state-metrics">State-level metrics</h2>
    <p>{stateName}: </p>
    <ul>
      {assessments
        .filter(item => item.category === 'Testing and Outcomes')
        .map(assessment => (
          <li>{assessment.text}</li>
        ))}
    </ul>
    <h2 id="race-ethnicity">Race and Ethnicity</h2>
    <ul>
      {assessments
        .filter(item => item.category === 'Race and Ethnicity')
        .map(assessment => (
          <li>{assessment.text}</li>
        ))}
    </ul>
    <h2 id="long-term-care">Long-term care</h2>
    <ul>
      {assessments
        .filter(item => item.category === 'Long-Term Care')
        .map(assessment => (
          <li>{assessment.text}</li>
        ))}
    </ul>
  </>
)

export default Assessment
