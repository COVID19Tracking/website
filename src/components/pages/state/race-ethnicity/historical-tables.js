import React, { useMemo } from 'react'

import RatesToggle from './rates-toggle'
import TableResponsive from '~components/common/table-responsive'
import { getAvailableMetricFields, formatTableValues } from './utils'

import historicalTableStyles from './historical-tables.module.scss'

const TableHeader = ({ header }) => {
  /* eslint-disable jsx-a11y/control-has-associated-label */
  // This wants a label for the empty spacing th value. We don't need that.
  return (
    <>
      <th colSpan="100%">
        <h4 className={historicalTableStyles.tableHeader}>{header}</h4>
      </th>
    </>
  )
}

const RaceTableHeader = () => (
  <>
    <th colSpan={2} />
    <TableHeader header="Race" />
  </>
)

const HistoricalTables = ({
  timeSeriesData,
  currentMetric,
  setUsePer100kRate,
  usePer100kRate,
}) => {
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
        label: removeMetricPrefix(tableMetric),
        isNumeric: true,
      }
    })

    if (raceOnly) {
      // race data
      labels.unshift({
        field: `${currentMetric}_Total`,
        label: 'Total',
        isNumeric: true,
      })

      labels.unshift({
        field: 'formattedDate',
        noWrap: true,
        label: 'Date',
      })
    } else {
      // ethnicity data
      labels.unshift({
        field: `${currentMetric}_Total`,
        label: 'Total',
        isNumeric: true,
        style: historicalTableStyles.ethnicityDate,
        headerStyle: historicalTableStyles.ethnicityDate,
      })

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
      <RatesToggle
        state={usePer100kRate}
        setState={setUsePer100kRate}
        currentMetric={currentMetric}
      />
      <div className={historicalTableStyles.container}>
        <div className={historicalTableStyles.table}>
          <TableResponsive
            labels={raceTableLabels}
            // todo pass pop data here
            header={<RaceTableHeader />}
            data={formatTableValues(timeSeriesData)}
          />
        </div>
        <div className={historicalTableStyles.table}>
          <TableResponsive
            labels={ethnicityTableLabels}
            header={<TableHeader header="Ethnicity" />}
            // todo pass pop data here
            data={formatTableValues(timeSeriesData)}
          />
        </div>
      </div>
    </>
  )
}

export default HistoricalTables
