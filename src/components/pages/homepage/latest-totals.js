import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FormatNumber } from '~components/utils/format'
import Paragraph from '~components/pages/homepage/paragraph'
import CtaLink from './cta-link'
import latestTotalsStyles from './latest-totals.module.scss'

const role = 'text'
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
          <div className={latestTotalsStyles.total} role={role}>
            <div className={latestTotalsStyles.number}>
              <FormatNumber number={totals.posNeg} />
            </div>
            <div className={latestTotalsStyles.label}>Total test results</div>
          </div>
          <div className={latestTotalsStyles.total}>
            <div className={latestTotalsStyles.number} role={role}>
              <FormatNumber number={totals.positive} />
            </div>
            <div className={latestTotalsStyles.label}>Positive cases</div>
          </div>
          <div className={latestTotalsStyles.total}>
            <div className={latestTotalsStyles.number} role={role}>
              <FormatNumber number={totals.death} />
            </div>
            <div className={latestTotalsStyles.label}>Deaths</div>
          </div>
          <span className={latestTotalsStyles.ctaLink}>
            <CtaLink to="/data">See all data</CtaLink>
          </span>
        </div>
      </div>
    </div>
  )
}
