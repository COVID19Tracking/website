/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { graphql } from 'gatsby'

import { extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import { timeMonth, timeDay } from 'd3-time'

import { formatNumber, parseDate } from '~utilities/visualization'

import Layout from '~components/layout'
import Container from '~components/common/container'

import chartStyles from '~components/charts/charts.module.scss'
import colors from '~scss/colors.module.scss'

import styles from './scrollytelling.module.scss'

// these next two can only be loaded clientside
import { Scrollama, Step } from '~utilities/react-scrollama'

const copy = [
  'In the pooled testing method, people are divided into groups.',
  'Instead of being tested individually, their samples are combined and tested all at once.',
  'Each group gets a result. If a group tests negative, everyone in that group is negative.',
  'If a group tests positive, all samples are tested individually. The lab keeps leftover samples so there is no need for the individuals to go back to testing sites.',
  'Pooled testing significantly cuts down supplies and testing wait times. In this example, 25 people were tested, but only 10 tests were used. ',
  'If everyone had been tested individually, 25 tests would have been needed.',
]

export default ({ images }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = props => setCurrentStepIndex(props.data)

  return (
    <Layout
      title="Pooled Testing"
      socialCard={{
        description: 'Our most up-to-date data on COVID-19 in the US.',
      }}
      path="/data"
    >
      <h2>In this example, we’ll test 25 people.</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 100,
            height: '20vh',
            gridColumn: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {currentStepIndex !== null && (
            <img src={images[currentStepIndex]} alt="test" />
          )}
        </div>
        <div style={{ gridColumn: 2 }}>
          <Scrollama onStepEnter={onStepEnter} offset={0.25}>
            {images.map((data, index) => (
              <Step data={index} key={JSON.stringify(data)}>
                <div
                  style={{
                    height: '50vh',
                    padding: '100px 20px',
                  }}
                >
                  {copy[index]}
                </div>
              </Step>
            ))}
          </Scrollama>
          <div
            style={{
              height: '50vh',
              padding: '100px 20px',
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
