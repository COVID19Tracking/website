/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import HorizontalBarChart from './charts/_HorizontalBarChart'
import { getStateName } from './_utils'

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
      .sort((a, b) => a.value - b.value)

    return nodes
  }, [query.allCovidState.nodes])

  console.log('data - ', data)
  return (
    <section style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, width: '40%' }}>
        <h4>Total Deaths By States</h4>
        <div>
          <HorizontalBarChart
            data={data}
            fill="#585BC1"
            height={400}
            marginBottom={40}
            marginLeft={50}
            marginRight={10}
            marginTop={10}
            xTicks={3}
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
