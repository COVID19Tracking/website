import React, { useMemo } from 'react'

import TableResponsive from '~components/common/table-responsive'
import { getAvailableMetricFields, formatTimeSeriesDates } from './utils'

import historicalTableStyles from './historical-tables.module.scss'

const TableHeader = ({ header }) => (
  <h4 className={historicalTableStyles.tableHeader}>{header}</h4>
)

const HistoricalTables = ({ timeSeriesData, currentMetric }) => {
  const removeMetricPrefix = metric => {
    /**
     * Removes the 'Cases_' or 'Hosp_', etc. prefix from a string.
     */
    return metric.replace(/^[A-z]*_/, '')
  }

  const generateTableData = (allData, raceOnly) => {
    /** Transforms API time series data into table-ready data
     * raceOnly: returns only race values when true, only ethnicity
     *  values when false
     */
    const computedTableData = useMemo(() => {
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

      const tableMetrics = {}

      tableMetrics.Cases = caseMetrics
      tableMetrics.Deaths = deathMetrics
      tableMetrics.Hosp = hospMetrics
      tableMetrics.Tests = testMetrics

      return tableMetrics
    }, [])

    return computedTableData
  }

  const generateTableLabels = (activeMetric, availableMetrics, raceOnly) => {
    /**
     * Generates the labels array for TableResponsive.
     * raceOnly: returns only race values when true, only ethnicity
     */
    const tableMetrics = availableMetrics[activeMetric]

    const labels = []

    tableMetrics.forEach((tableMetric, index) => {
      labels[index] = {
        field: tableMetric,
        label: `Known ${removeMetricPrefix(tableMetric)}`,
        isNumeric: true,
      }
    })

    labels.unshift({
      field: `${currentMetric}_Total`,
      label: 'Total',
      isNumeric: true,
    })

    if (raceOnly) {
      // race data
      labels.unshift({
        field: 'formattedDate',
        noWrap: true,
        label: 'Date',
      })
    } else {
      // ethnicity data
      labels.unshift({
        field: 'formattedDate',
        noWrap: true,
        style: historicalTableStyles.ethnicityDate,
        headerStyle: historicalTableStyles.ethnicityDate,
        label: 'Date',
      })
    }

    return labels
  }

  const allRaceData = generateTableData(timeSeriesData, true)
  const allEthnicityData = generateTableData(timeSeriesData, false)

  const raceTableLabels = generateTableLabels(currentMetric, allRaceData, true)
  const ethnicityTableLabels = generateTableLabels(
    currentMetric,
    allEthnicityData,
    false,
  )

  // todo handle separately/combined distinction here
  return (
    <>
      <h3>Race and Ethnicity Reported Separately</h3>
      <div className={historicalTableStyles.container}>
        <div className={historicalTableStyles.table}>
          <TableHeader header="Race" />
          <TableResponsive
            labels={raceTableLabels}
            data={formatTimeSeriesDates(timeSeriesData)}
          />
        </div>
        <div className={historicalTableStyles.table}>
          <TableHeader header="Ethnicity" />
          <TableResponsive
            labels={ethnicityTableLabels}
            data={formatTimeSeriesDates(timeSeriesData)}
          />
        </div>
      </div>
    </>
  )
}

export default HistoricalTables
