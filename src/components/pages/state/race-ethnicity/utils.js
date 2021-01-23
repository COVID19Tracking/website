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

const formatTableValues = timeSeriesData => {
  /**
   * Adds the formattedDate field, adds asterisks for small numbers.
   */
  const newDays = []

  timeSeriesData.forEach((day, index) => {
    newDays[index] = day
    newDays[index].formattedDate = formatDateToString(day.Date, 'MMMM d, yyyy')

    const availableDataPoints = Object.keys(day)
    const smallNumberCutoff = 10

    availableDataPoints.forEach(dataPointName => {
      const dataPointValue = day[dataPointName]
      if (
        dataPointValue != null &&
        Number.isInteger(dataPointValue) &&
        dataPointValue < smallNumberCutoff
      ) {
        // todo only use for per cap values - could use column in spreadsheet
        newDays[index][dataPointName] = `${dataPointValue}*`
      }
    })
  })
  return newDays
}

const isCombined = (combined, separate) => {
  /**
   * Identifies if a state reports racial data as combined or separate.
   */
  if (combined.length === 1) {
    return true
  }
  if (separate.length === 1) {
    return false
  }
  return null
}

export { getAvailableMetricFields, formatTableValues, isCombined }
