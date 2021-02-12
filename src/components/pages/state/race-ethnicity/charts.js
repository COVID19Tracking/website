import React, { useMemo } from 'react'
import { DateTime } from 'luxon'

import Chart from './chart'
import { getAvailablePer100kMetricFields } from './utils'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'

const ChartsSection = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
    {/* todo put the legend here */}
  </div>
)

const Charts = ({ timeSeriesData, currentMetric }) => {
  const getMetricData = (allData, metricTitle, metrics) => {
    /** Restructures a single metric's racial data (i.e. cases) for charts */
    const completedData = {} // store the final metric data object

    const suffixToRemove = '_per100k'

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
      const cleanMetricTitle = metric
        .replace(`${metricTitle}_`, '')
        .replace(suffixToRemove, '')

      const casesToIgnore = ['Multiracial', 'Other', 'Unknown']

      // If this is not in the list to ignore...
      if (casesToIgnore.indexOf(cleanMetricTitle) === -1) {
        // Add this time series to the completed object.
        completedData[cleanMetricTitle] = metricTimeSeries
      }
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
      const caseMetrics = getAvailablePer100kMetricFields(
        latestDay,
        'Cases_',
        raceOnly,
      )
      const deathMetrics = getAvailablePer100kMetricFields(
        latestDay,
        'Deaths_',
        raceOnly,
      )
      const hospMetrics = getAvailablePer100kMetricFields(
        latestDay,
        'Hospitalizations_',
        raceOnly,
      )
      const testMetrics = getAvailablePer100kMetricFields(
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
      <ChartsSection title="Race data">
        <Chart
          data={[
            {
              colorMap,
              label: `${currentMetric} per 100k people`,
              data: allRaceData[currentMetric],
            },
          ]}
          title={`${currentMetric} per 100k people`}
        />
      </ChartsSection>
      <ChartsSection title="Ethnicity data">
        <Chart
          data={[
            {
              colorMap,
              label: `${currentMetric} per 100k people`,
              data: allEthnicityData[currentMetric],
            },
          ]}
          title={`${currentMetric} per 100k people`}
        />
      </ChartsSection>
    </div>
  )
}

export default Charts
