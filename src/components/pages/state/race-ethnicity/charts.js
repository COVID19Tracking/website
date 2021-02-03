import React, { useMemo } from 'react'
import { DateTime } from 'luxon'

import Chart from './chart'
import { getAvailableMetricFields } from './utils'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'

const Charts = ({ timeSeriesData, currentMetric }) => {
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
      const hospMetrics = getAvailableMetricFields(
        latestDay,
        'Hospitalizations_',
        raceOnly,
      )
      const testMetrics = getAvailableMetricFields(
        latestDay,
        'Tests_',
        raceOnly,
      )

      const chartData = {}
      chartData.Cases = getMetricData(allData, 'Cases', caseMetrics)
      chartData.Deaths = getMetricData(allData, 'Deaths', deathMetrics)
      chartData.Hospitalizations = getMetricData(
        allData,
        'Hospitalizations',
        hospMetrics,
      )
      chartData.Tests = getMetricData(allData, 'Tests', testMetrics)

      return chartData
    }, [])

    return computedChartData
  }

  const allRaceData = generateChartData(timeSeriesData, true)
  const allEthnicityData = generateChartData(timeSeriesData, false)

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
