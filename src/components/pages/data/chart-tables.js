import React from 'react'
import { Link } from 'gatsby'
import { Table, Td, Th } from '~components/common/table'
import { FormatDate, FormatNumber } from '~components/utils/format'

const perMillion = percent => Math.round(percent * 1000000)

const ChartTable = ({ children, includeNational = false }) => (
  <Table>
    <thead>
      <tr>
        <Th header alignLeft>
          Date
        </Th>
        <Th isFirst>State</Th>
        <Th>State 7-day average</Th>
        <Th>State 1/million</Th>
        {includeNational && <Th>National 1/million</Th>}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
)

const ChartTables = ({ history, usHistory, testSource, testUnits }) => {
  const testField = `${
    testSource === 'posNeg' ? 'totalTestResults' : testSource
  }Increase`
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
  return (
    <>
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
      <h2 id="chart-table-new-tests">New tests ({testUnits})</h2>
      <ChartTable>
        {history.map(row => (
          <tr key={`tests-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>
              <FormatNumber number={row[testField]} />
            </Td>
            <Td>
              <FormatNumber number={dailyAverage(row, testField)} />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(row.childPopulation[testField].percent)}
              />
            </Td>
          </tr>
        ))}
      </ChartTable>
      <h2 id="chart-table-new-cases">New cases</h2>
      <ChartTable includeNational>
        {history.map(row => (
          <tr key={`cases-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>
              <FormatNumber number={row.positiveIncrease} />
            </Td>
            <Td>
              <FormatNumber number={dailyAverage(row, 'positiveIncrease')} />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(
                  row.childPopulation.positiveIncrease.percent,
                )}
              />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(
                  usHistory.find(item => item.date === row.date).childPopulation
                    .positiveIncrease.percent,
                )}
              />
            </Td>
          </tr>
        ))}
      </ChartTable>
      <h2 id="chart-table-hospitalizations">Current hospitalizations</h2>
      <ChartTable includeNational>
        {history.map(row => (
          <tr key={`hospitalizations-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>{row.hospitalizedCurrently}</Td>
            <Td>
              <FormatNumber
                number={dailyAverage(row, 'hospitalizedCurrently')}
              />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(
                  row.childPopulation.hospitalizedCurrently.percent,
                )}
              />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(
                  usHistory.find(item => item.date === row.date).childPopulation
                    .hospitalizedCurrently.percent,
                )}
              />
            </Td>
          </tr>
        ))}
      </ChartTable>
      <h2 id="chart-table-deaths">New deaths</h2>
      <ChartTable includeNational>
        {history.map(row => (
          <tr key={`death-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>{row.deathIncrease}</Td>
            <Td>
              <FormatNumber number={dailyAverage(row, 'deathIncrease')} />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(row.childPopulation.deathIncrease.percent)}
              />
            </Td>
            <Td>
              <FormatNumber
                number={perMillion(
                  usHistory.find(item => item.date === row.date).childPopulation
                    .deathIncrease.percent,
                )}
              />
            </Td>
          </tr>
        ))}
      </ChartTable>
    </>
  )
}

export default ChartTables
