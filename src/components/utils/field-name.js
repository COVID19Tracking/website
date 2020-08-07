import React from 'react'

const fieldNames = {
  date: 'Date',
  positive: 'Positive cases (confirmed and probable)',
  positiveIncrease: 'New Cases',
  hospitalized: 'Cumulative hospitalized',
  hospitalizedCumulative: 'Cumulative hospitalized',
  hospitalizedCurrently: 'Currently hospitalized',
  hospitalizedIncrease: 'New total hospitalizations',
  inIcuCumulative: 'Cumulative in ICU',
  inIcuCurrently: 'Currently in ICU',
  onVentilatorCumulative: 'Cumulative on ventilator',
  onVentilatorCurrently: 'Currently on ventilator',
  recovered: 'Recovered',
  deathProbable: 'Deaths (probable)',
  deathConfirmed: 'Deaths (confirmed)',
  death: 'Deaths (confirmed and probable)',
  deathIncrease: 'New deaths',
  negativeIncrease: 'Negative (increase)',
  negativeTestsViral: 'Negative tests (PCR)',
  negative: 'Negative cases',
  positiveCasesViral: 'Positive cases (PCR)',
  positiveTestsViral: 'Positive tests (PCR)',
  totalTestResults: 'Total test results',
  totalTestsViral: 'Total tests (PCR)',
  totalTestResultsIncrease: 'New tests',
}

const getFieldName = field => {
  if (typeof fieldNames[field] !== 'undefined') {
    return fieldNames[field]
  }
  return null
}

const FieldName = ({ field }) => <>{getFieldName(field)}</>

export { FieldName, getFieldName }
