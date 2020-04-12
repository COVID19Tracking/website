/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import HorizontalBarChart from './charts/_HorizontalBarChart'
import { getStateName, deathsBarColor } from './_utils'

export default function StateCumulativeDeathsContainer() {
  const query = useStaticQuery(graphql`
    {
      allCovidState {
        nodes {
          state
          death
        }
      }
    }
  `)

  const data = useMemo(() => {
    const nodes = query.allCovidState.nodes
      .map(d => ({
        name: getStateName(d.state),
        value: d.death,
      }))
      .filter(d => d !== null)
      .sort((a, b) => b.value - a.value)

    return nodes
  }, [query.allCovidState.nodes])

  const [isCollapsed, collapseChart] = useState(true)
  const toggleCollapse = () => collapseChart(u => !u)
  const height = isCollapsed ? 400 : 900
  return (
    <section style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, width: '40%' }}>
        <h4>Total Deaths By States</h4>
        <div>
          <HorizontalBarChart
            data={isCollapsed ? data.slice(0, 10) : data}
            fill={deathsBarColor}
            height={height}
            marginBottom={40}
            marginLeft={136}
            marginRight={40}
            marginTop={20}
            xTicks={4}
            yTicks={data.length}
            width={400}
          />
        </div>
        <button
          className="chart-expand-button"
          type="button"
          onClick={toggleCollapse}
        >
          {isCollapsed ? 'Show all states' : 'Collapse'}
        </button>
      </div>
      <div style={{ flexGrow: 1, width: '60%' }}>
        <p>text goes here</p>
      </div>
    </section>
  )
}
