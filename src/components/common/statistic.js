import React from 'react'
import { FormatNumber } from '~components/utils/format'
import statisticStyles from './statistic.module.scss'

const Statistic = ({ title, value, suffix }) => (
  <div className={statisticStyles.statistic}>
    <div className={statisticStyles.title}>{title}</div>
    <div className={statisticStyles.value}>
      <FormatNumber number={value} />
      {suffix}
    </div>
  </div>
)

const StatisticGroup = ({ children }) => (
  <div className={statisticStyles.group}>{children}</div>
)

export { Statistic, StatisticGroup }
