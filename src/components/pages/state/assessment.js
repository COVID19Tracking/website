import React from 'react'
import marked from 'marked'

const Assessment = ({ stateName, assessments }) => {
  const AssessmentList = ({ slug, title, category }) => (
    <>
      <h2 id={slug}>{title || category}</h2>
      <p>{stateName}:</p>
      <ul>
        {assessments
          .filter(item => item.category === category)
          .map(({ text }) => (
            <li
              dangerouslySetInnerHTML={{ __html: marked.inlineLexer(text, []) }}
            />
          ))}
      </ul>
    </>
  )

  return (
    <>
      <AssessmentList
        category="Testing and Outcomes"
        slug="state-metrics"
        title="State-level metrics"
      />
      <AssessmentList category="Race and Ethnicity" slug="race-ethnicity" />
      <AssessmentList category="Nursing homes" slug="nursing-home" />
    </>
  )
}

export default Assessment
