/* eslint-disable no-plusplus */
import React from 'react'
import { formatDate } from '~utilities/visualization'

const averageSize = 14

const getDataTrends = data => {
  const spikes = []
  const troughs = []
  let direction = false
  const getRange = (startIndex, endIndex) => {
    const many = []

    for (let i = startIndex; i < endIndex; i++) {
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

const ChartDescription = ({ label, data }) => {
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
      {`${label} started at ${start} on ${startDate}, and the most recent data on ${lastDate}
      was ${last}${direction !== false && `, and is moving ${direction}`}.
      ${lowPoint.value !== false &&
        `
          The most recent low-point in ${label.toLowerCase()} was 
          ${formatDate(lowPoint.date)}, at ${lowPoint.value}.
        `}
      ${highPoint.value !== false &&
        `
          The most recent high-point in ${label.toLowerCase()} was 
          ${formatDate(highPoint.date)}, at ${highPoint.value}.
        `}`}
    </div>
  )
}

export default ChartDescription
