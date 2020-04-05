import { timeParse, timeFormat } from 'd3-time-format'

export const parseDate = timeParse('%Y%m%d')
export const formatDate = timeFormat('%b. %e')
export const calculateTotal = d => d.positive + (d.negative || 0)
export const transformUsDaily = data => {
  return data
    .map(d => {
      const date = parseDate(d.date)
      return [
        {
          date,
          label: 'Total',
          value: calculateTotal(d),
        },
        {
          date,
          label: 'Positive',
          value: d.positive,
        },
      ]
    })
    .flat()
}

export const sortByDate = data =>
  data.sort((a, b) => {
    const aDate = parseDate(a.date)
    const bDate = parseDate(b.date)
    return aDate - bDate
  })
