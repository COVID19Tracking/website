import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import TableResponsive from '~components/common/table-responsive'

import RatesToggle from './rates-toggle'
import {
  getAvailableMetricFields,
  formatTableValues,
  addPerCapitaValues,
  removeMetricPrefix,
} from './utils'

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
  populationData,
  currentMetric,
  setUsePer100kRate,
  usePer100kRate,
  stateName,
}) => {
  const generateTableData = (allData, raceOnly) => {
    /** Transforms API time series data into table-ready data
     * raceOnly: returns only race values when true, only ethnicity
     *  values when false
     */
    const computedTableMetrics = useMemo(() => {
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

    return computedTableMetrics
  }

  const labelTooltipDict = {
    AIAN: 'American Indian or Alaska Native',
    NHPI: 'Native Hawaiian or Pacific Islander',
    Black: 'Black or African American',
    Latinx: 'Hispanic or Latino',
    NonHispanic: 'Not Hispanic or Latino',
    Multiracial: 'Two or more races',
  }

  const getTableHeaderStyle = label => {
    if (Object.keys(labelTooltipDict).indexOf(label) > -1) {
      return historicalTableStyles.abbreviatedLabel
    }
    return null
  }

  const getTableHeaderLabel = label => {
    if (Object.keys(labelTooltipDict).indexOf(label) === -1) {
      return label
    }
    // todo use tooltip
    // error: React.Children.only expected to receive a single React element
    return `${label} (w/ tt)`
  }

  const generateBaseTableLabels = (
    activeMetric,
    availableMetrics,
    raceOnly,
  ) => {
    /**
     * Generates the labels array for TableResponsive.
     * raceOnly: returns only race values when true, only ethnicity
     */
    const tableLabels = useMemo(() => {
      const tableMetrics = availableMetrics[activeMetric]

      const labels = []

      tableMetrics.forEach((tableMetric, index) => {
        const label = removeMetricPrefix(tableMetric)
        labels[index] = {
          fieldTotal: tableMetric,
          field: tableMetric,
          label: getTableHeaderLabel(label),
          headerStyle: getTableHeaderStyle(label),
        }
      })

      if (raceOnly) {
        // race data
        labels.unshift({
          fieldTotal: `${currentMetric}_Total`,
          field: `${currentMetric}_Total`,
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
        labels.unshift({
          fieldTotal: `${currentMetric}_Total`,
          field: `${currentMetric}_Total`,
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
  ) => {
    const base = generateBaseTableLabels(
      activeMetric,
      availableMetrics,
      raceOnly,
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
    const baseWithPer100k = base
    baseWithPer100k.map(label => {
      if (label.field.toLowerCase().includes('date')) {
        return label
      }
      const per100kLabel = label
      per100kLabel.field = `${label.field}_per100k`
      return per100kLabel
    })
    return baseWithPer100k
  }

  const allRaceData = generateTableData(timeSeriesData, true)
  const allEthnicityData = generateTableData(timeSeriesData, false)

  const raceTableLabels = generateTableLabels(
    currentMetric,
    allRaceData,
    true,
    usePer100kRate,
  )
  const ethnicityTableLabels = generateTableLabels(
    currentMetric,
    allEthnicityData,
    false,
    usePer100kRate,
  )

  // includes per cap values
  const completeTimeSeriesData = addPerCapitaValues(
    timeSeriesData,
    populationData,
  )

  const formattedTimeSeriesData = formatTableValues(
    completeTimeSeriesData,
    usePer100kRate,
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
            header={<RaceTableHeader />}
            data={formattedTimeSeriesData}
          />
        </div>
        {allEthnicityData[currentMetric].length === 0 ? (
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
              data={formattedTimeSeriesData}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default HistoricalTables
