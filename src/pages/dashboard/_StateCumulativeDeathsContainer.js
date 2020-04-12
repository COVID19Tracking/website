/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import HorizontalBarChart from './charts/_HorizontalBarChart'
import { getStateName, deathsBarColor, labelsColor } from './_utils'

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

  const [useChoropleth, setUseChoropleth] = useState(false)
  const toggleMapStyle = () => setUseChoropleth(u => !u)

  return (
    <section style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, width: '40%' }}>
        <h4>Total Deaths By States</h4>
        <div>
          <HorizontalBarChart
            data={data}
            labelsColor={labelsColor}
            fill={deathsBarColor}
            height={900}
            marginBottom={40}
            marginLeft={136}
            marginRight={40}
            marginTop={20}
            xTicks={4}
            yTicks={data.length}
            width={400}
          />
        </div>
      </div>
      <div style={{ flexGrow: 1, width: '60%' }}>
        <p>text goes here</p>
      </div>
    </section>
  )
}
