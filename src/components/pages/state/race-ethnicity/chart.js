import React from 'react'
import LineChart from '~components/charts/line-chart'

import styles from './chart.module.scss'

const Chart = ({ data, title }) => {
  const chartProps = {
    height: 180, // these control the dimensions used to render the svg but not the final size
    width: 280, // that is determined by the containing element
    marginBottom: 40,
    marginLeft: 60,
    marginRight: 30,
    xTicks: 3,
    showTicks: 6,
  }

  // todo add renderTooltipContents to line charts

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>
      <LineChart data={data} {...chartProps} />
    </div>
  )
}

export default Chart
