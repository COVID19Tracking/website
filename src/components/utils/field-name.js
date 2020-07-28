import React from 'react'

const fieldNames = {
  date: 'Date',
  positive: 'Cases (cumulative)',
  positiveIncrease: 'Cases (currently)',
  hospitalized: 'Hospitalized (cumulative)',
  hospitalizedCumulative: 'Hospitalized (cumulative)',
  hospitalizedCurrently: 'Hospitalized (currently)',
  hospitalizedIncrease: 'Hospitalized (increase)',
  inIcuCumulative: 'In ICU (cumulative)',
  inIcuCurrently: 'In ICU (currently)',
  onVentilatorCumulative: 'On Ventilator (cumulative)',
  onVentilatorCurrently: 'On Ventilator (currently)',
  recovered: 'Recovered',
  deathProbable: 'Death (probable)',
  deathConfirmed: 'Death (confirmed)',
  death: 'Death (cumulative)',
  deathIncrease: 'Death (increase)',
  negativeIncrease: 'Negative (increase)',
  negativeTestsViral: 'Viral test Negative',
  negative: 'Negative (cumulative)',
  positiveCasesViral: 'Viral case positive (increase)',
  positiveTestsViral: 'Viral test positive (increase)',
  totalTestResults: 'Total tests',
  totalTestsViral: 'Total viral tests',
  totalTestResultsIncrease: 'Total tests (increase)',
}

const getFieldName = field => {
  if (typeof fieldNames[field] !== 'undefined') {
    return fieldNames[field]
  }
  return null
}

const FieldName = ({ field }) => <>{getFieldName(field)}</>

export { FieldName, getFieldName }
