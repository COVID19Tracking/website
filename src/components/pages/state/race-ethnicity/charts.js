import React, { useMemo, useState, useRef, useEffect } from 'react'
import { DateTime } from 'luxon'
import classnames from 'classnames'

import Chart from './chart'
import { getAvailablePer100kMetricFields } from './utils'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'

const colorMap = {
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

const ChartLegend = ({
  legendColors,
  categories,
  selectedItem,
  setSelectedItem,
}) => {
  const categoryNames = {
    White: 'White',
    Black: 'Black or African American',
    LatinX: 'Hispanic or Latino',
    Asian: 'Asian',
    AIAN: 'American Indian and Alaskan Native',
    NHPI: 'Native Hawaiian and Other Pacific Islander',
    Ethnicity_Hispanic: 'Hispanic or Latino',
    Ethnicity_NonHispanic: 'Not Hispanic or Latino',
  }

  /**
   * Gets the appropriate classes for a legend item, based on the
   * item's category name.
   */
  const getCategoryStyles = categoryName => {
    if (selectedItem && categoryName === selectedItem) {
      return classnames(styles.category, styles.activeCategory)
    }
    return styles.category
  }

  return (
    <div className={styles.legend}>
      {categories.map(category => (
        <button
          className={getCategoryStyles(category)}
          onClick={() => setSelectedItem(category)}
          type="button"
        >
          <div
            style={{ 'background-color': legendColors[category] }}
            className={styles.swatch}
          />
          {categoryNames[category]}
        </button>
      ))}
      {selectedItem && (
        <button
          onClick={() => setSelectedItem(null)}
          type="button"
          className={styles.resetButton}
        >
          Reset highlight
        </button>
      )}
    </div>
  )
}

const ChartsSection = ({
  title,
  children,
  legendCategories,
  selectedItem,
  setSelectedItem,
  legendRef,
}) => (
  <div className={styles.chartSection}>
    <h3 className={styles.chartSectionTitle}>{title}</h3>
    {children}
    <div ref={legendRef}>
      <ChartLegend
        legendColors={colorMap}
        categories={legendCategories}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
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

  const activeRaceCategories = Object.keys(allRaceData[currentMetric])
  const activeEthnicityCategories = Object.keys(allEthnicityData[currentMetric])

  const [selectedCategory, setSelectedCategory] = useState(null)

  /**
   * Gets the colors for the line charts.
   * Greys out the non-selected values when a category is selected.
   */
  const getChartColors = () => {
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
  function useOutsideReset(ref) {
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
  useOutsideReset(raceLegendRef)

  const ethnicityLegendRef = useRef(null)
  useOutsideReset(ethnicityLegendRef)

  return (
    <div className={styles.wrapper}>
      <ChartsSection
        title="Race data"
        legendCategories={activeRaceCategories}
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
        legendRef={raceLegendRef}
      >
        <Chart
          data={[
            {
              colorMap: getChartColors(),
              label: `${currentMetric} per 100k people`,
              data: allRaceData[currentMetric],
            },
          ]}
          title={`${currentMetric} per 100k people`}
        />
      </ChartsSection>
      <ChartsSection
        title="Ethnicity data"
        legendCategories={activeEthnicityCategories}
        selectedItem={selectedCategory}
        setSelectedItem={setSelectedCategory}
        legendRef={ethnicityLegendRef}
      >
        <Chart
          data={[
            {
              colorMap: getChartColors(),
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
