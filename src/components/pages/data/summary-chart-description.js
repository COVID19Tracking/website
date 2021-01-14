import React from 'react'
import { Link } from 'gatsby'
import { formatDate } from '~utilities/visualization'

const averageSize = 14

const getDataTrends = data => {
  const spikes = []
  const troughs = []
  let direction = false
  const getRange = (startIndex, endIndex) => {
    const many = []

    for (let i = startIndex; i < endIndex; i += 1) {
      many.push(typeof data[i] === 'undefined' ? null : data[i])
    }

    return many
  }

  data.forEach((item, index) => {
    if (index < averageSize) {
      return
    }
    if (
      item >=
      Math.max(...getRange(index - averageSize / 2, index + averageSize / 2))
    ) {
      spikes.push({ value: item, index })
      direction = 'up'
    }
    if (
      item <=
      Math.min(...getRange(index - averageSize / 2, index + averageSize / 2))
    ) {
      troughs.push({ value: item, index })
      direction = 'down'
    }
  })
  return { spikes, troughs, direction }
}

const ChartDescription = ({ label, data, link }) => {
  const { spikes, troughs, direction } = getDataTrends(
    data.map(item => item.value),
  )
  const startDate = formatDate(data[0].date)
  const lastDate = formatDate(data[data.length - 1].date)
  const start = data[0].value
  const last = data[data.length - 1].value
  const lowPoint = troughs.length && data[troughs.pop().index]
  const highPoint = spikes.length && data[spikes.pop().index]

  return (
    <div className="a11y-only">
      {`${direction !== false &&
        `${label} is changing ${direction}.`} The most recent value
      for ${label} was ${last} on ${lastDate}, and the earlist value for ${label} was ${start} on ${startDate}.
      `}
      {highPoint.value &&
        `The highest recent value for ${label} was ${
          highPoint.value
        } on ${formatDate(highPoint.date)}.`}
      {lowPoint.value &&
        `The lowest recent value for ${label} was ${
          lowPoint.value
        } on ${formatDate(lowPoint.date)}.`}{' '}
      <Link to={link}>Access all chart data</Link>
    </div>
  )
}
export default ChartDescription
