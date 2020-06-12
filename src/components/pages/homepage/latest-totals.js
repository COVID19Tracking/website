import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FormatNumber } from '~components/utils/format'
import Paragraph from '~components/common/landing-page/paragraph'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Total from '~components/common/landing-page/total'
import latestTotalsStyles from './latest-totals.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    {
      allCovidUs {
        nodes {
          posNeg
          positive
          death
        }
      }
    }
  `)
  const totals = data.allCovidUs.nodes[0]
  return (
    <div className={latestTotalsStyles.container}>
      <Paragraph>
        Every day, our volunteers compile the latest numbers on tests, confirmed
        cases, hospitalizations, and patient outcomes from every US state and
        territory.
      </Paragraph>
      <div className={latestTotalsStyles.wrapper}>
        <div className={latestTotalsStyles.headerContainer}>
          <h2>Latest totals:</h2>
        </div>
        <div className={latestTotalsStyles.allTotals}>
          <Total
            label="Total test results"
            number={<FormatNumber number={totals.posNeg} />}
          />
          <Total
            label="Cases"
            number={<FormatNumber number={totals.positive} />}
          />
          <Total
            label="Deaths"
            number={<FormatNumber number={totals.death} />}
          />

          <span className={latestTotalsStyles.ctaLink}>
            <CtaLink to="/data">See all data</CtaLink>
          </span>
        </div>
      </div>
    </div>
  )
}
