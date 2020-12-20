import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import { NationalTotals } from '../components/sidebar'
import Title from '../components/title'
import ChartDataLink from '../components/chart-data-link'
import colors from '~scss/colors.module.scss'
import BarChart from '~components/charts/bar-chart'
import nationalChartStyle from './national-charts.module.scss'

const Chart = ({ data, field, fill, lineColor }) => {
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
    <BarChart
      data={daily}
      lineData={dailyAverage}
      fill={fill}
      lineColor={lineColor}
      height={600}
      width={400}
      marginBottom={40}
      marginLeft={60}
      marginRight={30}
      marginTop={10}
      xTicks={3}
      showTicks={6}
      lastXTick
    />
  )
}

const NationalChart = ({ item }) => {
  const data = useStaticQuery(graphql`
    {
      lastUpdate: allCovidUsDaily(
        sort: { fields: date, order: DESC }
        limit: 1
      ) {
        nodes {
          date(formatString: "MMMM D, YYYY")
        }
      }
      allCovidUsDaily(
        filter: { date: { gt: "2020-04-01" } }
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          date
          positiveIncrease
          deathIncrease
          hospitalizedCurrently
          totalTestResultsIncrease
        }
      }
    }
  `)

  return (
    <>
      <Row>
        <Col width={[4, 6, 10]}>
          <Title title="National overview">
            Data updated {data.lastUpdate.nodes[0].date}
          </Title>
          <Row>
            <Col width={[2, 3, 3]}>
              <h3 className={nationalChartStyle.label}>New tests</h3>
              <Chart
                data={data.allCovidUsDaily.nodes}
                field="totalTestResultsIncrease"
                fill={colors.colorPlum200}
                lineColor={colors.colorPlum700}
              />
            </Col>
            <Col width={[2, 3, 3]} paddingLeft={[0, 0, 0]}>
              <h3 className={nationalChartStyle.label}>New cases</h3>
              <Chart
                data={data.allCovidUsDaily.nodes}
                field="positiveIncrease"
                fill={colors.colorStrawberry100}
                lineColor={colors.colorStrawberry200}
              />
            </Col>
            <Col width={[2, 3, 3]} paddingLeft={[0, 0, 0]}>
              <h3 className={nationalChartStyle.label}>
                Current hospitalizations
              </h3>
              <Chart
                data={data.allCovidUsDaily.nodes}
                field="hospitalizedCurrently"
                fill={colors.colorBlueberry200}
                lineColor={colors.colorBlueberry400}
              />
            </Col>
            <Col width={[2, 3, 3]}>
              <h3 className={nationalChartStyle.label}>New deaths</h3>
              <Chart
                data={data.allCovidUsDaily.nodes}
                field="deathIncrease"
                fill={colors.colorSlate300}
                lineColor={colors.colorSlate700}
              />
            </Col>
          </Row>

          <ChartDataLink to="/data/national/chart-tables">
            Access all data for these charts
          </ChartDataLink>
        </Col>
        <Col width={[4, 6, 2]}>
          <NationalTotals relatedPost={item.relatedPost} />
        </Col>
      </Row>
    </>
  )
}

export default NationalChart
