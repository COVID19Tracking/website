import React from 'react'
import Chart from './chart'

import styles from './charts.module.scss'
import colors from '~scss/colors.module.scss'

// todo pass the data here
const Charts = ({ population, usePer100kRate }) => {
  const chartProps = {
    height: 180, // these control the dimensions used to render the svg but not the final size
    width: 280, // that is determined by the containing element
    marginBottom: 40,
    marginLeft: 60,
    marginRight: 30,
    xTicks: 3,
    showTicks: 6,
  }

  const caseData = [
    { date: new Date(2018, 11, 24), value: 200 },
    { date: new Date(2018, 11, 25), value: 120 },
    { date: new Date(2018, 11, 26), value: 250 },
    { date: new Date(2018, 11, 27), value: 230 },
    { date: new Date(2018, 11, 28), value: 290 },
  ]

  if (usePer100kRate) {
    // use per 100k metrics
    /* eslint-disable no-param-reassign */
    caseData.forEach((point, i, dataArray) => {
      dataArray[i].value = point.value / (population / 100000)
    })
  }

  // todo add renderTooltipContents to line charts

  return (
    <div className={styles.wrapper}>
      <Chart
        data={[
          {
            color: colors.colorBlueberry200,
            stroke: 2,
            label: 'Cases',
            data: caseData,
          },
        ]}
        title="Race Data"
        {...chartProps}
      />
      <Chart
        data={[
          {
            color: colors.colorStrawberry200,
            stroke: 2,
            label: 'Cases',
            data: caseData,
          },
        ]}
        title="Ethnicity Data"
        {...chartProps}
      />
    </div>
  )
}

export default Charts
