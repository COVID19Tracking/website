import React, { useMemo, useState, useRef, useEffect } from 'react'
import { DateTime } from 'luxon'

import Chart from './chart'
import { getAvailablePer100kMetricFields } from './utils'
import NoData from './no-data-chart'

import colors from '~scss/colors.module.scss'
import ChartSection from './chart-section'

export const colorMap = {
  AIAN: colors.crdtAian,
  Asian: colors.crdtAsian,
  Black: colors.crdtBlack,
  Ethnicity_Hispanic: colors.crdtLatinx,
  Ethnicity_NonHispanic: colors.crdtNonHispanic,
  LatinX: colors.crdtLatinx,
  NHPI: colors.crdtNhpi,
  White: colors.crdtWhite,
}

const Charts = ({
  timeSeriesData,
  currentMetric,
  isCombined,
  isEmbed = false,
  stateName,
}) => {
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

  const chartLabel = `${currentMetric} per 100k people`

  const currentMetricIsEmpty =
    Object.keys(allEthnicityData[currentMetric]).length === 0

  return (
    <div>
      <ChartSection
        title={isCombined ? 'Race/ethnicity data' : 'Race data'}
        legendCategories={activeRaceCategories}
        selectedItem={selectedRaceCategory}
        setSelectedItem={setSelectedRaceCategory}
        legendColors={colorMap}
        legendRef={raceLegendRef}
        isEmbed={isEmbed}
      >
        <Chart
          data={[
            {
              colorMap: getChartColors(selectedRaceCategory),
              label: chartLabel,
              data: allRaceData[currentMetric],
            },
          ]}
          title={chartLabel}
        />
      </ChartSection>
      {!currentMetricIsEmpty && (
        <ChartSection
          title="Ethnicity data"
          legendCategories={activeEthnicityCategories}
          selectedItem={selectedEthnicityCategory}
          setSelectedItem={setSelectedEthnicityCategory}
          legendColors={colorMap}
          legendRef={ethnicityLegendRef}
          isEmbed={isEmbed}
        >
          <Chart
            data={[
              {
                colorMap: getChartColors(selectedEthnicityCategory),
                label: chartLabel,
                data: allEthnicityData[currentMetric],
              },
            ]}
            title={chartLabel}
          />
        </ChartSection>
      )}
      {!isCombined && currentMetricIsEmpty && (
        <div>
          <NoData
            metric={currentMetric}
            dataType="ethnicity"
            state={stateName}
          />
        </div>
      )}
    </div>
  )
}

const getMetrics = allData => {
  /**
   * Identifies all of the available metrics (tests, hosp,
   * deaths, cases) for a given state
   * */
  const latestDay = allData[0]
  const nonNullValues = []

  Object.keys(latestDay).forEach(key => {
    if (latestDay[key] != null) {
      nonNullValues.push(key)
    }
  })

  const metrics = {
    Cases: {
      available: false,
    },
    Deaths: {
      available: false,
    },
    Tests: {
      available: false,
    },
    Hospitalizations: {
      available: false,
    },
  }

  const checkValue = (value, prefix) => {
    /**
     * Check if a value is actually reported by the state (true)
     * or just an 'Unknown' or 'Total' value from CTP (false).
     */
    if (
      value.startsWith(prefix) &&
      !value.endsWith('Unknown') &&
      !value.endsWith('_per100k') &&
      !value.endsWith('Total')
    ) {
      return true
    }
    return false
  }

  nonNullValues.every(value => {
    if (checkValue(value, 'Cases_')) {
      metrics.Cases.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Deaths_')) {
      metrics.Deaths.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Hospitalizations_')) {
      metrics.Hospitalizations.available = true
      return false
    }
    return true
  })

  nonNullValues.every(value => {
    if (checkValue(value, 'Tests_')) {
      metrics.Tests.available = true
      return false
    }
    return true
  })

  return metrics
}

export default Charts

export { Charts, getMetrics }
