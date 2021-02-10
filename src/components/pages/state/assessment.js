import React from 'react'
import marked from 'marked'

const adjectives = {
  1: 'Serious',
  2: 'Some',
  3: 'Few',
}

const Assessment = ({ assessments, summary }) => {
  const AssessmentList = ({ slug, title, category, itemSummary }) => (
    <>
      <h2 id={slug}>{title || category}</h2>
      <p>
        <strong>{adjectives[itemSummary]} issues exist:</strong>
      </p>
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
        itemSummary={summary.taco}
      />
      <AssessmentList
        category="Race and Ethnicity"
        slug="race-ethnicity"
        itemSummary={summary.crdt}
      />
      <AssessmentList
        category="Long-Term Care"
        slug="long-term-care"
        itemSummary={summary.ltc}
      />
    </>
  )
}

export default Assessment
