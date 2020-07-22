import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { renderedComponent } from '~plugins/gatsby-render-components'
import slug from '~utilities/slug'
import Layout from '~share-cards/layout'
import style from './state.module.scss'

const State = renderedComponent(({ state }) => (
  <Layout>
    <div className={style.container}>
      In {state.stateName}, confirmed COVID-19 cases among Black people are{' '}
      <strong>
        {Math.round((state.blackPctPos / state.whitePctPos) * 10) / 10} times
      </strong>{' '}
      the rate of white people.
    </div>
  </Layout>
))

export default () => {
  const data = useStaticQuery(graphql`
    {
      allCovidRaceDataCombined(filter: { state: { ne: "US" } }) {
        nodes {
          stateName
          blackPctPos
          whitePctPos
        }
      }
      allCovidRaceDataSeparate(filter: { state: { ne: "US" } }) {
        nodes {
          stateName
          blackPctPos
          whitePctPos
        }
      }
    }
  `)
  const states = [
    ...data.allCovidRaceDataCombined.nodes,
    ...data.allCovidRaceDataSeparate.nodes,
  ]

  return (
    <>
      {states.map(state => (
        <State
          state={state}
          renderOptions={{
            width: 500,
            height: 400,
            relativePath: 'race-dashboard',
            filename: `${slug(state.stateName)}`,
          }}
        />
      ))}
    </>
  )
}
