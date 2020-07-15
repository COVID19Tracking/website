import React, { useState } from 'react'
import { graphql } from 'gatsby'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Scrollama, Step } from '~utilities/react-scrollama'

import Layout from '~components/layout'
import Container from '~components/common/container'

export default () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)
  const [dataKey, setDataKey] = useState(null)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    console.log('on step enter')
    setCurrentStepIndex(data)
    if (data === 1) {
      setDataKey('pv')
    } else if (data === 2) {
      setDataKey('uv')
    }
  }
  return (
    <Layout
      title="Scrollytelling"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      path="/data"
    >
      <Container narrow>
        <h2>Scrollytelling</h2>
        <div style={{ margin: '50vh 0', border: '2px dashed skyblue' }}>
          <div
            style={{ position: 'sticky', top: 0, border: '1px solid orchid' }}
          >
            {`I'm sticky. The current triggered step index is: ${currentStepIndex}`}
            {dataKey && <Chart dataKey={dataKey} />}
          </div>
          <Scrollama onStepEnter={onStepEnter} debug>
            {[1, 2, 3, 4].map((_, stepIndex) => (
              <Step data={stepIndex} key={_}>
                <div
                  style={{
                    padding: '0 0 50vh',
                    border: '1px solid gray',
                    opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                  }}
                >
                  {`I'm a Scrollama Step of index ${stepIndex}`}
                </div>
              </Step>
            ))}
          </Scrollama>
        </div>
      </Container>
    </Layout>
  )
}
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const Chart = ({ dataKey }) => (
  <>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {dataKey === 'uv' && (
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      )}
    </LineChart>
  </>
)

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
