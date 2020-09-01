import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Total from '~components/common/landing-page/total'
import totalsStyle from './totals.module.scss'

const CrdtTotals = () => {
  const data = useStaticQuery(graphql`
    query {
      covidRaceDataHomepage {
        statesReportingCases
        statesReportingDeaths
      }
    }
  `)
  const {
    statesReportingCases,
    statesReportingDeaths,
  } = data.covidRaceDataHomepage
  return (
    <div className={totalsStyle.totals}>
      <h3>States and territories reporting race and ethnicity data</h3>
      <div className={totalsStyle.totalsWrap}>
        <Total
          label="Reporting positive cases"
          number={`${statesReportingCases} states/territories`}
        />
        <Total
          label="Reporting deaths"
          number={`${statesReportingDeaths} states/territories`}
        />
      </div>
    </div>
  )
}

export default CrdtTotals
