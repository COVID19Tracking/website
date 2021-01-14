import { formatDateToString } from '~components/utils/format'

const getAvailableMetricFields = (latestDay, startsWith, raceOnly) => {
  /**
   * Returns a list of all of the available metric fields.
   * raceOnly: returns only race values when true, only ethnicity
   *  values when false
   */
  const listOfMetrics = []

  Object.keys(latestDay).forEach(value => {
    if (
      value.startsWith(startsWith) &&
      latestDay[value] != null &&
      !value.includes('Total')
    ) {
      listOfMetrics.push(value)
    }
  })

  if (raceOnly) {
    return listOfMetrics.filter(metric => !metric.includes('Ethnicity'))
  }
  if (!raceOnly) {
    return listOfMetrics.filter(metric => metric.includes('Ethnicity'))
  }

  return listOfMetrics
}

const formatTimeSeriesDates = timeSeriesData => {
  const newDays = []

  timeSeriesData.forEach((day, index) => {
    newDays[index] = day
    newDays[index].formattedDate = formatDateToString(day.Date, 'MMMM d, yyyy')
  })
  return newDays
}

export { getAvailableMetricFields, formatTimeSeriesDates }
