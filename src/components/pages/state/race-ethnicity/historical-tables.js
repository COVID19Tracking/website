import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import TableResponsive from '~components/common/table-responsive'
import RatesToggle from './rates-toggle'
import { getAvailableMetricFields, formatTableValues } from './utils'

import alertBang from '~images/race-dashboard/alert-bang-orange.svg'
import historicalTableStyles from './historical-tables.module.scss'

const TableHeader = ({ header, inner = false }) => {
  if (!inner) {
    return (
      <tr>
        <th colSpan="100%">
          <h4 className={historicalTableStyles.tableHeader}>{header}</h4>
        </th>
      </tr>
    )
  }
  return (
    <th colSpan="100%">
      <h4 className={historicalTableStyles.tableHeader}>{header}</h4>
    </th>
  )
}

const RaceTableHeader = () => (
  <tr>
    <th colSpan={2} className={historicalTableStyles.hidden}>
      <span>Historical data for</span>
    </th>
    <TableHeader header="Race" inner />
  </tr>
)

const NoDataPlaceholder = ({ stateName, dataType, metric }) => (
  <div className={historicalTableStyles.noDataContainer}>
    <h3 className={historicalTableStyles.header}>
      <img src={alertBang} alt="" className={historicalTableStyles.bang} />
      {dataType}
    </h3>
    <p className={historicalTableStyles.content}>
      {stateName} does not report {dataType.toLowerCase()} data for{' '}
      {metric.toLowerCase()}.
      <br />
      <Link to="/race/get-better-data">Help us get better data.</Link>
    </p>
  </div>
)

const HistoricalTables = ({
  timeSeriesData,
  currentMetric,
  setUsePer100kRate,
  usePer100kRate,
  stateName,
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
            data={formatTableValues(timeSeriesData, usePer100kRate)}
          />
        </div>
        {allEthnicityData[currentMetric].length === 0 ||
        (allEthnicityData[currentMetric].length === 1 &&
          allEthnicityData[currentMetric][0].endsWith('Ethnicity_Unknown')) ? (
          <NoDataPlaceholder
            stateName={stateName}
            dataType="Ethnicity"
            metric={currentMetric}
          />
        ) : (
          <div className={historicalTableStyles.table}>
            <TableResponsive
              labels={ethnicityTableLabels}
              header={<TableHeader header="Ethnicity" />}
              // todo pass pop data here
              data={formatTableValues(timeSeriesData, usePer100kRate)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default HistoricalTables
