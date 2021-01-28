import React, { useMemo } from 'react'
import classnames from 'classnames'

import TableResponsive from '~components/common/table-responsive'

import RatesToggle from './rates-toggle'
import NoDataPlaceholder from './no-data'
import { TableHeader, RaceTableHeader } from './table-header'
import {
  getAvailableMetricFields,
  formatTableValues,
  addPer100kValues,
} from './utils'

import generateTableLabels from './utils/generate-table-labels'

import historicalTableStyles from './historical-tables.module.scss'

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
      const hospMetrics = getAvailableMetricFields(
        latestDay,
        'Hospitalizations_',
        raceOnly,
      )
      const testMetrics = getAvailableMetricFields(
        latestDay,
        'Tests_',
        raceOnly,
      )

      const tableMetrics = {}

      tableMetrics.Cases = caseMetrics
      tableMetrics.Deaths = deathMetrics
      tableMetrics.Hospitalizations = hospMetrics
      tableMetrics.Tests = testMetrics

      return tableMetrics
    }, [])

    return computedTableMetrics
  }

  const allRaceData = generateTableData(timeSeriesData, true)
  const allEthnicityData = generateTableData(timeSeriesData, false)

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

  const raceTableLabels = generateTableLabels(
    currentMetric,
    allRaceData,
    true,
    usePer100kRate,
    reportsRaceSeparately(),
  )
  const ethnicityTableLabels = generateTableLabels(
    currentMetric,
    allEthnicityData,
    false,
    usePer100kRate,
    reportsRaceSeparately(),
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

  const reportsEthnicityData = () => {
    let hasNonNullValue = false
    allEthnicityData[currentMetric].every(columnName => {
      if (formattedTimeSeriesData[0][columnName] !== null) {
        hasNonNullValue = true
        return false
      }
      return true
    })
    return hasNonNullValue
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
        {!reportsEthnicityData() ? (
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
