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

  // Set the current metric to the first available metric
  const metricsList = Object.keys(metrics)
  const availableMetrics = metricsList
    .map(metric => {
      if (metrics[metric].available) {
        // Metric name if available
        return metric
      }
      return null // Else, null
    })
    .filter(metricName => metricName !== null)
  if (availableMetrics.length > 0) {
    setCurrentMetric(availableMetrics[0])
  }
  return (
    <div className={className}>
      <MetricSelector
        currentMetric={currentMetric}
        setCurrentMetric={setCurrentMetric}
        metrics={metrics}
        stateName={stateName}
        asOfDate={
          <DataAsOf stateDate={lastReportedByState} ctpDate={asOfDate} />
        }
        isEmbed={isEmbed}
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
