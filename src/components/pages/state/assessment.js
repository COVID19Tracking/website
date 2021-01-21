import React from 'react'
import marked from 'marked'

const Assessment = ({ stateName, assessments }) => {
  if (!assessments.text) {
    return null
  }
  const AssessmentList = ({ category }) => (
    <ul>
      {assessments
        .filter(item => item.category === category)
        .map(({ text }) => (
          <li>{marked.inlineLexer(text, [])}</li>
        ))}
    </ul>
  )

  return (
    <>
      <h2 id="state-metrics">State-level metrics</h2>
      <p>{stateName}: </p>
      <AssessmentList category="Testing and Outcomes" />

      <h2 id="race-ethnicity">Race and Ethnicity</h2>
      <p>{stateName}: </p>
      <AssessmentList category="Race and Ethnicity" />
      <h2 id="long-term-care">Long-term care</h2>
      <AssessmentList category="Long-Term Care" />
    </>
  )
}

export default Assessment
