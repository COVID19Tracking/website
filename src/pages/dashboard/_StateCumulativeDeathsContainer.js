import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import HorizontalBarChart from './charts/_HorizontalBarChart'
import { getStateName, deathsBarColor } from './_utils'

import './state-cumulative-deaths-container.scss'

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
    <div>
      <h4>Total Deaths By States</h4>
      <section className="state-cumulative-death-container">
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
          <button
            className="chart-expand-button"
            type="button"
            onClick={toggleCollapse}
          >
            {isCollapsed ? 'Show all states' : 'Collapse'}
          </button>
        </div>
      </section>
    </div>
  )
}
