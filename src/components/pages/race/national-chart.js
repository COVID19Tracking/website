import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import DotChart from './charts/dot-chart'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      covidRaceDataHomepage {
        blackLivesLost
        deathsRaceKnown
      }
    }
  `)
  const { blackLivesLost, deathsRaceKnown } = data.covidRaceDataHomepage
  return (
    <DotChart
      deathsRaceKnown={deathsRaceKnown}
      deathsBlackKnown={blackLivesLost}
    />
  )
}
