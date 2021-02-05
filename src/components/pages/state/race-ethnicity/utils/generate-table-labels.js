import React, { useMemo } from 'react'
import Tooltip from '~components/common/tooltip'

import { removeMetricPrefix } from './index'

import historicalTableStyles from '../historical-tables.module.scss'

const labelTooltipDict = {
  AIAN: 'American Indian or Alaska Native',
  NHPI: 'Native Hawaiian or Pacific Islander',
  Black: 'Black or African American',
  Multiracial: 'Two or more races',
}

const generateBaseTableLabels = (
  activeMetric,
  availableMetrics,
  raceOnly,
  reportsRaceSeparately,
) => {
  /**
   * Generates the labels array for TableResponsive.
   * @param {string} activeMetric: The current covid-19 metric for the state,
   *   i.e. Cases or Tests.
   * @param {Object} availableMetrics: A dictionary of the available metrics,
   *   with keys like Cases, Tests.
   * @param {boolean} raceOnly: Returns only race values when true, only
   *   ethnicity values when false.
   * @param {boolean} reportsRaceSeparately: Whether or not the state reports
   *   race data separately from ethnicity data.
   */
  const tableLabels = useMemo(() => {
    // Only generate this content once...

    // The metrics to show in the table header.
    const tableMetrics = availableMetrics[activeMetric]

    const getTableHeaderStyle = label => {
      /**
       * Gets the style for a given header label.
       */
      if (Object.keys(labelTooltipDict).indexOf(label) > -1) {
        return historicalTableStyles.abbreviatedLabel
      }
      return null
    }

    const getTableHeaderLabel = label => {
      /**
       * Generates a column label for the table header.
       */
      let labelText = label

      if (labelText === 'Hispanic' || labelText === 'LatinX') {
        labelText = 'Hispanic\u200a/\u200aLatino'
      }

      if (labelText === 'NonHispanic') {
        labelText = 'Non Hispanic\u200a/\u200aLatino'
      }

      if (Object.keys(labelTooltipDict).indexOf(labelText) === -1) {
        /*
          Don't need a tooltip here: label is not an abbreviation / does not
          need further explanation.
        */
        return labelText
      }

      return (
        <>
          <Tooltip label={<span>{labelTooltipDict[labelText]}</span>}>
            <span className={historicalTableStyles.headerLabel} aria-hidden>
              {labelText}
            </span>
          </Tooltip>
          <span className={historicalTableStyles.fullHeaderLabel}>
            {labelTooltipDict[labelText]}
          </span>
        </>
      )
    }

    const unsortedLabels = []

    tableMetrics.forEach((tableMetric, index) => {
      const label = removeMetricPrefix(tableMetric)

      // Add each column label to the unsorted array.
      unsortedLabels[index] = {
        fieldTotal: tableMetric,
        field: tableMetric,
        label: getTableHeaderLabel(label),
        headerStyle: getTableHeaderStyle(label),
      }
    })

    let labels

    if (raceOnly) {
      // Just looking at race data.

      const pushMetricByContains = (listToSearch, listToPush, searchString) => {
        /**
         * Push metrics from one list to another only if their fieldTotal
         * property contains a search string.
         */
        listToSearch.every(metric => {
          if (metric.fieldTotal.includes(searchString)) {
            listToPush.push(metric)
            return false
          }
          return true
        })
      }

      labels = []

      // Metrics in the same order as the dashboard.
      const metricsInOrder = []

      // _Black is the first element
      metricsInOrder.push('_Black')

      /*
        Add LatinX but only if the state reports race data combined
        with ethnicity.
      */
      if (!reportsRaceSeparately) {
        metricsInOrder.push('LatinX')
      }

      // All other metrics, in order.
      metricsInOrder.push(
        '_Asian',
        '_NHPI',
        '_AIAN',
        '_Multiracial',
        '_White',
        '_Other',
        '_Unknown',
      )

      metricsInOrder.forEach(metric => {
        pushMetricByContains(unsortedLabels, labels, metric)
      })

      // Prepend the totals column.
      labels.unshift({
        fieldTotal: `${activeMetric}_Total`,
        field: `${activeMetric}_Total`,
        label: 'Total',
      })

      // Prepend the date column.
      labels.unshift({
        fieldTotal: 'formattedDate',
        field: 'formattedDate',
        noWrap: true,
        label: 'Date',
      })
    } else {
      // Just looking at ethnicity data.

      labels = unsortedLabels // Don't need to sort for ethnicity.

      // Prepend the totals column.
      labels.unshift({
        fieldTotal: `${activeMetric}_Total`,
        field: `${activeMetric}_Total`,
        label: 'Total',
        style: historicalTableStyles.ethnicityDate,
        headerStyle: historicalTableStyles.ethnicityDate,
      })

      // Prepend the date column.
      labels.unshift({
        fieldTotal: 'formattedDate',
        field: 'formattedDate',
        noWrap: true,
        style: historicalTableStyles.ethnicityDate,
        headerStyle: historicalTableStyles.ethnicityDate,
        label: 'Date',
      })
    }
    return labels
  }, [activeMetric, availableMetrics])

  return tableLabels
}

const generateTableLabels = (
  activeMetric,
  availableMetrics,
  raceOnly,
  isPer100k,
  reportsRaceSeparately,
) => {
  /**
   * Generates the labels array for TableResponsive.
   * @param {string} activeMetric: The current covid-19 metric for the state,
   *   i.e. Cases or Tests.
   * @param {Object} availableMetrics: A dictionary of the available metrics,
   *   with keys like Cases, Tests.
   * @param {boolean} raceOnly: Returns only race values when true, only
   *   ethnicity values when false.
   * @param {boolean} isPer100k: Whether or not the table should show rates
   *   (per 100k people) or totals.
   * @param {boolean} reportsRaceSeparately: Whether or not the state reports
   *   race data separately from ethnicity data.
   */
  const base = generateBaseTableLabels(
    activeMetric,
    availableMetrics,
    raceOnly,
    reportsRaceSeparately,
  )
  if (!isPer100k) {
    return base.map(label => {
      if (label.field.toLowerCase().includes('date')) {
        return label
      }
      const totalLabel = label
      totalLabel.field = totalLabel.fieldTotal
      return totalLabel
    })
  }
  let baseWithPer100k = base
  baseWithPer100k.map(label => {
    if (label.field.toLowerCase().includes('date')) {
      return label
    }
    const per100kLabel = label
    per100kLabel.field = `${label.field}_per100k`
    return per100kLabel
  })

  // Hide total, other, two (or more races), and unknown
  // values for per100k labels.
  baseWithPer100k = baseWithPer100k.filter(
    label =>
      !(
        label.field.includes('_Other') ||
        label.field.includes('Multiracial') ||
        label.field.includes('_Unknown') ||
        label.field.includes('_Total')
      ),
  )
  return baseWithPer100k
}

export default generateTableLabels
