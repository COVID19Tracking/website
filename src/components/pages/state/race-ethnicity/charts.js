import React, { useMemo } from 'react'
import { DateTime } from 'luxon'
import Chart from './chart'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'

const Charts = ({
  population,
  usePer100kRate,
  timeSeriesData,
  currentMetric,
}) => {
  // todo use population on a per-race/ethnicity basis (not on a per-state basis)

  const getAvailableMetricFields = (latestDay, startsWith, raceOnly) => {
    /**
     * Returns a list of all of the available metric fields.
     * raceOnly: returns only race values when true, only ethnicity
     *  values when false
     */
    const listOfMetrics = []

    Object.keys(latestDay).forEach(value => {
      if (value.startsWith(startsWith)) {
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

  const getMetricData = (allData, metricTitle, metrics) => {
    /** Restructures a single metric's racial data (i.e. cases) for charts */
    const completedData = {} // store the final metric data object

    metrics.forEach(metric => {
      const metricTimeSeries = [] // create a time series array for each metric
      allData.forEach(day => {
        // for each day, add this metric's data to the time series
        metricTimeSeries.push({
          date: DateTime.fromISO(day.Date).setZone('America/New_York'),
          value: day[metric],
        })
      })
      // remove the 'Cases_' prefix from the metric
      const cleanMetricTitle = metric.replace(`${metricTitle}_`, '')
      // add this time series to the completed object
      completedData[cleanMetricTitle] = metricTimeSeries
    })

    return completedData
  }

  const generateChartData = (allData, raceOnly) => {
    /** Transforms API time series data into chart-ready data
     * raceOnly: returns only race values when true, only ethnicity
     *  values when false
     */
    const computedChartData = useMemo(() => {
      const latestDay = allData[0]
      const caseMetrics = getAvailableMetricFields(
        latestDay,
        'Cases_',
        raceOnly,
      )
      const deathMetrics = getAvailableMetricFields(
        latestDay,
        'Deaths_',
        raceOnly,
      )
      const hospMetrics = getAvailableMetricFields(latestDay, 'Hosp_', raceOnly)
      const testMetrics = getAvailableMetricFields(
        latestDay,
        'Tests_',
        raceOnly,
      )

      const chartData = {}
      chartData.Cases = getMetricData(allData, 'Cases', caseMetrics)
      chartData.Deaths = getMetricData(allData, 'Deaths', deathMetrics)
      chartData.Hosp = getMetricData(allData, 'Hosp', hospMetrics)
      chartData.Tests = getMetricData(allData, 'Tests', testMetrics)

      return chartData
    }, [])

    return computedChartData
  }

  const allRaceData = generateChartData(timeSeriesData, true)
  const allEthnicityData = generateChartData(timeSeriesData, false)

  if (usePer100kRate) {
    // use per 100k metrics
    /* eslint-disable no-param-reassign */
    // todo stop this from dividing the original value multiple times (i.e. don't edit the original value)
    // todo use all racial groups, not just Black
    // todo apply to both race and ethnicity data
    allRaceData[currentMetric].Black.forEach((point, i, dataArray) => {
      // todo use population on a per-race/ethnicity basis (not on a per-state basis)
      dataArray[i].value = point.value / (population / 100000)
    })
  }

  // todo add renderTooltipContents to line charts

  // todo separate race and ethnicity, based on combined or separate states

  // todo find alternatives to red, blue, green

  const colorMap = {
    AIAN: colors.crdtAian,
    Asian: colors.crdtAsian,
    Black: colors.crdtBlack,
    Ethnicity_Hispanic: 'blue',
    Ethnicity_NonHispanic: 'red',
    LatinX: colors.Latinx,
    Multiracial: 'green',
    NHPI: colors.crdtNhpi,
    White: colors.crdtWhite,
  }

  return (
    <div className={styles.wrapper}>
      <Chart
        data={[
          {
            colorMap,
            label: 'Cases',
            data: allRaceData[currentMetric],
          },
        ]}
        title="Race Data"
      />
      <Chart
        data={[
          {
            colorMap,
            label: 'Cases',
            data: allEthnicityData[currentMetric],
          },
        ]}
        title="Ethnicity Data"
      />
    </div>
  )
}

export default Charts
