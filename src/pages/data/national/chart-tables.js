import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'
import { Table, Td, Th } from '~components/common/table'
import { FormatDate, FormatNumber } from '~components/utils/format'

const perMillion = percent => Math.round(percent * 1000000)

const NationalChartTablesPage = ({ data, path }) => {
  const { allCovidUsDaily } = data
  const history = allCovidUsDaily.nodes

  const dailyAverage = (row, field) => {
    const index = history.findIndex(item => item.date === row.date)
    const sum = []
    if (index > history.length - 7) {
      return null
    }
    for (let i = index; i < index + 7; i += 1) {
      sum.push(history[i][field])
    }
    return Math.round(sum.reduce((a, b) => a + b, 0) / sum.length)
  }

  const ChartTable = ({ field }) => (
    <Table>
      <thead>
        <tr>
          <Th header alignLeft>
            Date
          </Th>
          <Th isFirst>Value</Th>
          <Th>7-day average</Th>
          <Th>1/million</Th>
        </tr>
      </thead>
      <tbody>
        {history.map(row => (
          <tr key={`tests-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>
              <FormatNumber number={row[field]} />
            </Td>
            <Td>
              <FormatNumber number={dailyAverage(row, field)} />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(row.childPopulation[field].percent)}
              />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  return (
    <Layout
      title="National chart data"
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
      path={path}
    >
      <ul>
        <li>
          <Link to="#chart-table-new-tests">New tests</Link>
        </li>
        <li>
          <Link to="#chart-table-new-cases">New cases</Link>
        </li>
        <li>
          <Link to="#chart-table-hospitalizations">
            Current hospitalizations
          </Link>
        </li>
        <li>
          <Link to="#chart-table-deaths">New deaths</Link>
        </li>
      </ul>
      <h2 id="chart-table-new-tests">New tests</h2>
      <ChartTable field="totalTestResultsIncrease" />
      <h2 id="chart-table-new-cases">New cases</h2>
      <ChartTable field="positiveIncrease" />
      <h2 id="chart-table-hospitalizations">Current hospitalizations</h2>
      <ChartTable field="hospitalizedCurrently" />
      <h2 id="chart-table-deaths">New deaths</h2>
      <ChartTable field="deathIncrease" />
    </Layout>
  )
}

export default NationalChartTablesPage

export const query = graphql`
  query {
    allCovidUsDaily {
      nodes {
        date(formatString: "YYYYMMDD")
        totalTestResultsIncrease
        hospitalizedCurrently
        deathIncrease
        positiveIncrease
        childPopulation {
          deathIncrease {
            percent
          }
          positiveIncrease {
            percent
          }
          hospitalizedCurrently {
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
