import React, { useMemo } from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import TableResponsive from '~components/common/table-responsive'
import Tooltip from '~components/common/tooltip'

import RatesToggle from './rates-toggle'
import {
  getAvailableMetricFields,
  formatTableValues,
  addPer100kValues,
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

const RaceTableHeader = ({ isPer100k, isSeparate }) => (
  <tr>
    {isSeparate && (
      <th colSpan={isPer100k ? 1 : 2} className={historicalTableStyles.hidden}>
        <span>Historical data for</span>
      </th>
    )}
    <TableHeader header={isSeparate ? 'Race' : 'Race/Ethnicity'} inner />
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
  ) => {
    /**
     * Generates the labels array for TableResponsive.
     * raceOnly: returns only race values when true, only ethnicity
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
        const pushMetricByContains = (
          listToSearch,
          listToPush,
          searchString,
        ) => {
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
        const metricsInOrder = [
          '_Black',
          'LatinX',
          '_Asian',
          '_NHPI',
          '_AIAN',
          '_Multiracial',
          '_White',
          '_Other',
        ]

        // Sort metrics in the same order as the dashboard
        metricsInOrder.forEach(metric => {
          pushMetricByContains(unsortedLabels, labels, metric)
        })

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

        labels = unsortedLabels // Don't need to sort for ethnicity.

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
  const completeTimeSeriesData =
    populationData === null
      ? timeSeriesData
      : addPer100kValues(timeSeriesData, populationData)

  const formattedTimeSeriesData = useMemo(
    () => formatTableValues(completeTimeSeriesData),
    [completeTimeSeriesData],
  )

  const reportsRaceSeparately = () => {
    if (populationData === null) {
      return true // Guam
    }
    if (populationData.type === 'sep') {
      return true
    }
    if (populationData.type === 'com') {
      return false
    }
    return null
  }

  return (
    <>
      <RatesToggle
        state={usePer100kRate}
        setState={setUsePer100kRate}
        currentMetric={currentMetric}
        noRates={populationData === null}
      />
      <div
        className={classnames(
          historicalTableStyles.container,
          !reportsRaceSeparately() && historicalTableStyles.combined,
        )}
      >
        <div>
          <TableResponsive
            labels={raceTableLabels}
            header={
              <RaceTableHeader
                isPer100k={usePer100kRate}
                isSeparate={reportsRaceSeparately()}
              />
            }
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
          <>
            {reportsRaceSeparately() && (
              <div className={historicalTableStyles.ethnicityTable}>
                <TableResponsive
                  labels={ethnicityTableLabels}
                  header={<TableHeader header="Ethnicity" />}
                  data={formattedTimeSeriesData}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default HistoricalTables
