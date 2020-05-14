import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Total from '~components/common/landing-page/total'
import totalsStyle from './totals.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidRaceDataTest {
        nodes {
          aianPctDeath
          blackPctDeath
          asianPctDeath
          blackSensPctDeath
          hispanicPctDeath
          nhpiPctDeath
          otherPctDeath
          twoPctDeath
          whitePctDeath
          state
          aianPctPos
          asianPctPos
          blackPctPos
          blackSensPctPos
          hispanicPctPos
          nhpiPctPos
          otherPctPos
          twoPctPos
          whitePctPos
        }
      }
    }
  `)

  const statesReportingDeath = {}
  data.allCovidRaceDataTest.nodes.forEach(row => {
    Object.keys(row).forEach(name => {
      if (name !== 'state' && name.search('Death') > -1 && row[name] > 0) {
        statesReportingDeath[row.state] = row.state
      }
    })
  })
  return (
    <div className={totalsStyle.totals}>
      <h3>States reporting racial and ethnic data</h3>
      <div className={totalsStyle.totalsWrap}>
        <Total
          label="Reporting positive cases"
          number={`${data.allCovidRaceDataTest.nodes.length} states`}
        />
        <Total
          label="Reporting deaths"
          number={`${Object.keys(statesReportingDeath).length} states`}
        />
      </div>
    </div>
  )
}
