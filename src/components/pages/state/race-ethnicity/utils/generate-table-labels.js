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

const getTableHeaderStyle = label => {
  if (Object.keys(labelTooltipDict).indexOf(label) > -1) {
    return historicalTableStyles.abbreviatedLabel
  }
  return null
}

const getTableHeaderLabel = label => {
  let labelText = label

  if (labelText === 'Hispanic' || labelText === 'LatinX') {
    labelText = 'Hispanic\u200a/\u200aLatino'
  }

  if (labelText === 'NonHispanic') {
    labelText = 'Non Hispanic\u200a/\u200aLatino'
  }

  if (Object.keys(labelTooltipDict).indexOf(labelText) === -1) {
    return labelText
  }
  return (
    <Tooltip label={<span>{labelTooltipDict[labelText]}</span>}>
      <span className={historicalTableStyles.headerLabel}>{labelText}</span>
    </Tooltip>
  )
}

const generateBaseTableLabels = (
  activeMetric,
  availableMetrics,
  raceOnly,
  reportsRaceSeparately,
) => {
  /**
   * Generates the labels array for TableResponsive.
   * raceOnly: returns only race values when true, only ethnicity
   * values when false
   */
  const tableLabels = useMemo(() => {
    const tableMetrics = availableMetrics[activeMetric]

    const unsortedLabels = []

    tableMetrics.forEach((tableMetric, index) => {
      const label = removeMetricPrefix(tableMetric)
      unsortedLabels[index] = {
        fieldTotal: tableMetric,
        field: tableMetric,
        label: getTableHeaderLabel(label),
        headerStyle: getTableHeaderStyle(label),
      }
    })

    let labels

    if (raceOnly) {
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

      // LatinX but only if the state reports data as combined.
      if (!reportsRaceSeparately) {
        metricsInOrder.push('LatinX')
      }

      // All other metrics.
      metricsInOrder.push(
        '_Asian',
        '_NHPI',
        '_AIAN',
        '_Multiracial',
        '_White',
        '_Other',
      )

      // Sort metrics in the same order as the dashboard
      metricsInOrder.forEach(metric => {
        pushMetricByContains(unsortedLabels, labels, metric)
      })

      // race data
      labels.unshift({
        fieldTotal: `${activeMetric}_Total`,
        field: `${activeMetric}_Total`,
        label: 'Total',
      })

      labels.unshift({
        fieldTotal: 'formattedDate',
        field: 'formattedDate',
        noWrap: true,
        label: 'Date',
      })
    } else {
      // ethnicity data

      labels = unsortedLabels // Don't need to sort for ethnicity.

      labels.unshift({
        fieldTotal: `${activeMetric}_Total`,
        field: `${activeMetric}_Total`,
        label: 'Total',
        style: historicalTableStyles.ethnicityDate,
        headerStyle: historicalTableStyles.ethnicityDate,
      })

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

  // Hide total, other, two (or more race), and unknown
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
