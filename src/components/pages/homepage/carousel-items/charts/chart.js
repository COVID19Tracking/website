import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import ChartDataLink from '../chart-data-link'
import BarChart from '~components/charts/bar-chart'
import { Col, Row } from '~components/common/grid'
import { NationalTotals } from '../sidebar'
import chartStyle from './chart.module.scss'

const Chart = ({ title, data, field, fill, lineColor, relatedPost }) => {
  const graphqlData = useStaticQuery(graphql`
    {
      lastUpdate: allCovidUsDaily(
        sort: { fields: date, order: DESC }
        limit: 1
      ) {
        nodes {
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  `)
  const { lastUpdate } = graphqlData
  const daily = data
    .map(item => ({
      date: DateTime.fromISO(item.date).toJSDate(),
      value: item[field],
    }))
    .sort((a, b) => (a.date > b.date ? 1 : -1))
  const dailyAverage = []
  daily.forEach(({ date }, key) => {
    if (key >= daily.length - 7) {
      return
    }
    let average = 0
    for (let i = 0; i < 7; i += 1) {
      average += daily[key + i].value
    }
    dailyAverage.push({
      date,
      value: average / 7,
    })
  })
  daily.splice(-7, 7)
  return (
    <Row>
      <Col width={[4, 6, 10]}>
        <div className={chartStyle.label}>
          <h2>{title}</h2>
          <p>Data updated {lastUpdate.nodes[0].date}</p>
        </div>
        <BarChart
          data={daily}
          lineData={dailyAverage}
          fill={fill}
          lineColor={lineColor}
          height={450}
          width={900}
          marginBottom={40}
          marginLeft={60}
          marginRight={30}
          marginTop={10}
          xTicks={3}
          showTicks={6}
          lastXTick
        />
        <ChartDataLink to="/data/national/chart-tables">
          Access all data for this chart
        </ChartDataLink>
      </Col>
      <Col width={[4, 6, 2]}>
        <NationalTotals relatedPost={relatedPost} />
      </Col>
    </Row>
  )
}

export default Chart
