import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import { extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line, curveNatural } from 'd3-shape'
import { FormatDate, FormatNumber } from '~components/utils/format'
import colors from '~scss/colors.module.scss'
import sparklineStyles from './sparklines.module.scss'

const StatisticSparkline = ({ data, field, color }) => {
  const height = 40
  const width = 120
  const marginTop = 5
  const dates = []
  const values = []
  data.forEach(item => {
    dates.push(DateTime.fromISO(item.date).toJSDate())
    values.push(item[field])
  })

  const dateDomain = extent(dates)

  const xScaleTime = scaleTime()
    .domain(dateDomain)
    .range([0, width])

  const yMaxEffective = max(values)

  const yScale = scaleLinear()
    .domain([0, yMaxEffective])
    .nice()
    .range([height, 0])

  const lineFn = line()
    .defined(d => !Number.isNaN(d[field]) && d[field] !== null)
    .curve(curveNatural)
    .x(d => xScaleTime(DateTime.fromISO(d.date).toJSDate()))
    .y(d => yScale(d[field]))

  return (
    <svg
      className={sparklineStyles.sparkline}
      viewBox={`0 0 ${width} ${height - marginTop}`}
      aria-hidden
    >
      <g transform={`translate(0 ${marginTop})`}>
        <path d={lineFn(data)} stroke={color} strokeWidth={3} fill="none" />
      </g>
    </svg>
  )
}

const ChartSparklines = ({ history }) => {
  const { covidUs } = useStaticQuery(graphql`
    {
      covidUs {
        date
        totalTestResultsIncrease
        positiveIncrease
        hospitalizedCurrently
        deathIncrease
      }
    }
  `)

  return (
    <>
      <h3 className={sparklineStyles.heading}>
        On <FormatDate date={covidUs.date} format="LLLL d" />
      </h3>
      <ul className={sparklineStyles.list}>
        <li className={sparklineStyles.tests}>
          <FormatNumber number={covidUs.totalTestResultsIncrease} /> new tests
          <StatisticSparkline
            data={history}
            field="totalTestResultsIncrease"
            color={colors.colorPlum500}
          />
        </li>
        <li className={sparklineStyles.cases}>
          <FormatNumber number={covidUs.positiveIncrease} /> new cases
          <StatisticSparkline
            data={history}
            field="positiveIncrease"
            color={colors.colorStrawberry200}
          />
        </li>
        <li className={sparklineStyles.hosptialization}>
          <span>
            <FormatNumber number={covidUs.hospitalizedCurrently} /> currently{' '}
            <abbr title="hospitalized">hosp.</abbr>
          </span>
          <StatisticSparkline
            data={history}
            field="hospitalizedCurrently"
            color={colors.colorBlueberry400}
          />
        </li>
        <li className={sparklineStyles.deaths}>
          <FormatNumber number={covidUs.deathIncrease} /> new deaths
          <StatisticSparkline
            data={history}
            field="deathIncrease"
            color={colors.colorSlate600}
          />
        </li>
      </ul>
    </>
  )
}

export default ChartSparklines
