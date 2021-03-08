import React from 'react'
import MetricSelector from './metric-selector'
import DataAsOf from './data-as-of'
import { Charts, getMetrics } from './charts'

const SelectorAndCharts = ({
  stateIsCombined,
  lastReportedByState,
  stateName,
  currentMetric,
  setCurrentMetric,
  asOfDate,
  completeTimeSeriesData,
  className,
  isEmbed = false,
}) => {
  const metrics = getMetrics(completeTimeSeriesData)
  return (
    <div className={className && className}>
      <MetricSelector
        currentMetric={currentMetric}
        setCurrentMetric={setCurrentMetric}
        metrics={metrics}
        stateName={stateName}
        asOfDate={
          <DataAsOf stateDate={lastReportedByState} ctpDate={asOfDate} />
        }
      />
      <Charts
        timeSeriesData={completeTimeSeriesData}
        currentMetric={currentMetric}
        isCombined={stateIsCombined}
        stateName={stateName}
        isEmbed={isEmbed}
      />
    </div>
  )
}
export default SelectorAndCharts
