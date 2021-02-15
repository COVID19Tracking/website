import React, { useMemo, useState, useRef, useEffect } from 'react'
import { DateTime } from 'luxon'

import Chart from './chart'
import { getAvailablePer100kMetricFields } from './utils'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'
import ChartSection from './chart-section'

export const colorMap = {
  AIAN: colors.crdtAian,
  Asian: colors.crdtAsian,
  Black: colors.crdtBlack,
  Ethnicity_Hispanic: 'blue',
  Ethnicity_NonHispanic: 'red',
  LatinX: colors.crdtLatinx,
  Multiracial: 'green',
  NHPI: colors.crdtNhpi,
  White: colors.crdtWhite,
}

const Charts = ({ timeSeriesData, currentMetric, isCombined }) => {
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

  // todo find alternatives to red, blue, green

  const activeRaceCategories = Object.keys(allRaceData[currentMetric])
  const activeEthnicityCategories = Object.keys(allEthnicityData[currentMetric])

  const [selectedRaceCategory, setSelectedRaceCategory] = useState(null)
  const [selectedEthnicityCategory, setSelectedEthnicityCategory] = useState(
    null,
  )

  /**
   * Gets the colors for the line charts.
   * Greys out the non-selected values when a category is selected.
   */
  const getChartColors = selectedCategory => {
    if (selectedCategory === null) {
      return colorMap
    }

    const selectedColorMap = {
      ...colorMap,
    }

    Object.keys(selectedColorMap).forEach(key => {
      if (key !== selectedCategory) {
        selectedColorMap[key] = colors.colorSlate200
      }
    })
    return selectedColorMap
  }

  /**
   * Hook that resets the selected category on clicks outside of the passed ref.
   * See: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
   */
  function useOutsideReset(ref, setSelectedCategory) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // Reset the selected category
          setSelectedCategory(null)
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const raceLegendRef = useRef(null)
  useOutsideReset(raceLegendRef, setSelectedRaceCategory)

  const ethnicityLegendRef = useRef(null)
  useOutsideReset(ethnicityLegendRef, setSelectedEthnicityCategory)

  return (
    <div className={styles.wrapper}>
      <ChartSection
        title={isCombined ? 'Race/ethnicity data' : 'Race data'}
        legendCategories={activeRaceCategories}
        selectedItem={selectedRaceCategory}
        setSelectedItem={setSelectedRaceCategory}
        legendColors={colorMap}
        legendRef={raceLegendRef}
      >
        <Chart
          data={[
            {
              colorMap: getChartColors(selectedRaceCategory),
              label: `${currentMetric} per 100k people`,
              data: allRaceData[currentMetric],
            },
          ]}
          title={`${currentMetric} per 100k people`}
        />
      </ChartSection>
      {!isCombined && (
        <ChartSection
          title="Ethnicity data"
          legendCategories={activeEthnicityCategories}
          selectedItem={selectedEthnicityCategory}
          setSelectedItem={setSelectedEthnicityCategory}
          legendColors={colorMap}
          legendRef={ethnicityLegendRef}
        >
          <Chart
            data={[
              {
                colorMap: getChartColors(selectedEthnicityCategory),
                label: `${currentMetric} per 100k people`,
                data: allEthnicityData[currentMetric],
              },
            ]}
            title={`${currentMetric} per 100k people`}
          />
        </ChartSection>
      )}
    </div>
  )
}

export default Charts
