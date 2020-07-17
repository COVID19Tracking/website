/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { graphql } from 'gatsby'

import { extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import { timeMonth, timeDay } from 'd3-time'

import loadable from '@loadable/component'

import { formatNumber, parseDate } from '~utilities/visualization'

import Layout from '~components/layout'
import Container from '~components/common/container'

import chartStyles from '~components/charts/charts.module.scss'
import colors from '~scss/colors.module.scss'

import styles from './scrollytelling.module.scss'

const Scrollama = loadable(() => import('~utilities/react-scrollama'), {
  resolveComponent: components => components.Scrollama,
})

const Step = loadable(() => import('~utilities/react-scrollama'), {
  resolveComponent: components => components.Step,
})

export default ({ data }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)
  const linesData = [
    { field: 'positiveIncrease', color: colors.colorStrawberry200 },
    { field: 'hospitalizedCurrently', color: colors.colorBlueberry400 },
    { field: 'deathIncrease', color: colors.colorSlate700 },
  ]

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = props => setCurrentStepIndex(props.data)

  const chartData = data.allCovidUsDaily.nodes.map(({ date, ...rest }) => ({
    ...rest,
    date: parseDate(date),
  }))
  return (
    <Layout
      title="Scrollytelling"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      path="/data"
    >
      <Container narrow>
        <div style={{ border: '2px dashed skyblue' }}>
          <div
            style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}
          >
            <Chart
              data={chartData.reverse()}
              linesData={
                currentStepIndex ? linesData.slice(0, currentStepIndex) : []
              }
            />
          </div>
          <Scrollama onStepEnter={onStepEnter} debug>
            {[1, 2, 3].map(_ => (
              <Step data={_} key={_}>
                <div
                  style={{
                    padding: '0 0 50vh',
                    border: '1px solid gray',
                    opacity: currentStepIndex === _ ? 1 : 0.2,
                  }}
                >
                  {`I'm a Scrollama Step of ${_}`}
                </div>
              </Step>
            ))}
          </Scrollama>
        </div>
      </Container>
    </Layout>
  )
}

const Chart = ({
  data,
  width = 500,
  height = 400,
  linesData = [{ field: 'positiveIncrease' }],
}) => {
  const dateDomain = extent(data, d => d.date)

  const marginLeft = 50
  const marginBottom = 30

  const xScaleTime = scaleTime()
    .domain(dateDomain)
    .range([marginLeft, width])
  // this needs to be modified to accept multipls inputs
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.positiveIncrease)])
    .nice()
    .range([height - marginBottom, 0])
  const lines = linesData.map(l =>
    line()
      .defined(d => !Number.isNaN(d[l.field]) && d[l.field] !== null)
      .curve(curveCardinal)
      .x(d => xScaleTime(d.date))
      .y(d => yScale(d[l.field])),
  )

  return (
    <svg width={width} height={height}>
      {/* y ticks */}
      <g transform={`translate(${marginLeft} )`}>
        {yScale.ticks(4).map((tick, i) => (
          <g key={tick}>
            {/* Do not remove nested svg. See https://github.com/COVID19Tracking/website/pull/645#discussion_r411676987 */}
            <svg
              y={yScale(tick) + 6}
              x="-10"
              className={chartStyles.yTickLabel}
            >
              <text className={chartStyles.label}>{formatNumber(tick)}</text>
            </svg>
            <line
              className={chartStyles.gridLine}
              x1={0}
              x2={width}
              y1={yScale(tick)}
              y2={yScale(tick)}
            />
          </g>
        ))}
      </g>
      {lines.map((l, i) => (
        <path
          d={l(data)}
          stroke={linesData[i].color}
          strokeWidth="3"
          fill="none"
          className={styles.path}
        />
      ))}
    </svg>
  )
}

export const query = graphql`
  query {
    allCovidUsDaily {
      nodes {
        date
        totalTestResultsIncrease
        positiveIncrease
        hospitalizedCurrently
        deathIncrease
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
  }
`
