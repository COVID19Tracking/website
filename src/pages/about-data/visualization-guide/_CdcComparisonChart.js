import React from 'react'
import Img from 'gatsby-image'

import cdcStyles from './cdc-comparison.module.scss'
import dashboardStyles from './dashboard.module.scss'

const LegendItem = ({ style, title }) => (
  <div className={cdcStyles.legendItem}>
    <span className={cdcStyles.legendColor} style={style} />
    <span>{title}</span>
  </div>
)

const legend = [
  {
    title: 'CDC reports fewer tests than states',
    style: { backgroundColor: '#6767b4' },
  },
  {
    title: 'CDC reports more tests than states',
    style: { backgroundColor: '#e7ac60' },
  },
]

export default ({ image }) => (
  <>
    <p>
      The CDC has now published a COVID Data Tracker, but their data only
      partially matches the numbers we get from the state public health
      authorities as we showed in <a href="/cdc-paper">a detailed evaluation</a>{' '}
      of the new CDC data.
    </p>
    <h3 className={dashboardStyles.chartTitle}>
      Comparing state-reported test count data with the CDC data
    </h3>
    <p className={cdcStyles.subhead}>
      There are large discrepencies in the test counts reported by the CDC and
      state public health agencies.
    </p>
    <div className={cdcStyles.legendContainer}>
      {legend.map(item => (
        <LegendItem
          style={item.style}
          title={item.title}
          key={item.style.color}
        />
      ))}
    </div>
    <Img
      fluid={image.fluid}
      alt="A comparison of reported tests from the CDC and individual states."
    />
    <p className={cdcStyles.chartLabel}>
      Data as of May 15; All units are in absolute numbers and states are only
      included if the testing count differs by 5% or more. Our data will always
      be an undercount. We can only track tests that states report, and not all
      states report all tests. More significantly, per-capita testing levels in
      the US remain low, which means that an unknown but probably very large
      number of people are sick, but aren’t being tested.
    </p>
  </>
)
