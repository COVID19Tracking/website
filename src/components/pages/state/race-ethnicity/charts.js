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

  const getAvailableMetricFields = (latestDay, startsWith) => {
    const listOfMetrics = []

    Object.keys(latestDay).forEach(value => {
      if (value.startsWith(startsWith)) {
        listOfMetrics.push(value)
      }
    })

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

  const generateChartData = allData => {
    /** Transforms API time series data into chart-ready data */
    const computedChartData = useMemo(() => {
      const latestDay = allData[0]
      const caseMetrics = getAvailableMetricFields(latestDay, 'Cases_')
      const deathMetrics = getAvailableMetricFields(latestDay, 'Deaths_')
      const hospMetrics = getAvailableMetricFields(latestDay, 'Hosp_')
      const testMetrics = getAvailableMetricFields(latestDay, 'Tests_')

      const chartData = {}
      chartData.Cases = getMetricData(allData, 'Cases', caseMetrics)
      chartData.Deaths = getMetricData(allData, 'Deaths', deathMetrics)
      chartData.Hosp = getMetricData(allData, 'Hosp', hospMetrics)
      chartData.Tests = getMetricData(allData, 'Tests', testMetrics)

      return chartData
    }, [])

    return computedChartData
  }

  const allData = generateChartData(timeSeriesData)

  if (usePer100kRate) {
    // use per 100k metrics
    /* eslint-disable no-param-reassign */
    // todo stop this from dividing the original value multiple times (i.e. don't edit the original value)
    // todo use all racial groups, not just Black
    allData[currentMetric].Black.forEach((point, i, dataArray) => {
      // todo use population on a per-race/ethnicity basis (not on a per-state basis)
      dataArray[i].value = point.value / (population / 100000)
    })
  }

  // todo add renderTooltipContents to line charts
  // todo use all racial groups, not just Black

  return (
    <div className={styles.wrapper}>
      <Chart
        data={[
          {
            color: colors.colorBlueberry200,
            stroke: 2,
            label: 'Cases',
            data: allData[currentMetric],
          },
        ]}
        title="Race Data"
      />
      <Chart
        data={[
          {
            color: colors.colorStrawberry200,
            stroke: 2,
            label: 'Cases',
            data: allData[currentMetric],
          },
        ]}
        title="Ethnicity Data"
      />
    </div>
  )
}

export default Charts
