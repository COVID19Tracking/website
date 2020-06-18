import React from 'react'

const dailyAverage = (history, field, range = 7) => {
  const average = []
  history.forEach((row, rowIndex) => {
    const pastRows = [row[field]]
    let pastIndex = rowIndex
    while (pastIndex >= 0 && pastIndex >= rowIndex - range) {
      pastRows.push(history[pastIndex][field])
      pastIndex -= 1
    }
    average.push(pastRows.reduce((a, b) => a + b, 0) / pastRows.length)
  })
  return average
}

export default ({ history }) => (
  <div>
    Charts go here. Daily avereage of positive:{' '}
    {dailyAverage(history, 'positive').map(average => (
      <>{average} </>
    ))}
  </div>
)
