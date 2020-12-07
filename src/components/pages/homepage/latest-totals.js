import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Total from '~components/common/landing-page/total'
import latestTotalsStyles from './latest-totals.module.scss'

const HomepageLatestTotals = () => {
  const data = useStaticQuery(graphql`
    {
      covidUs {
        totalTestResults
        positive
        death
      }
    }
  `)
  const totals = data.covidUs
  return (
    <div className={latestTotalsStyles.container}>
      <div className={latestTotalsStyles.wrapper}>
        <span className={latestTotalsStyles.ctaLink}>
          <CtaLink to="/data">See all data</CtaLink>
        </span>
        <div className={latestTotalsStyles.headerContainer}>
          <h2>Latest totals:</h2>
        </div>
        <Row className={latestTotalsStyles.allTotals}>
          <Col width={[4, 6, 4]}>
            <Total
              label="Total test results"
              number={<FormatNumber number={totals.totalTestResults} />}
            />
          </Col>
          <Col width={[4, 6, 4]}>
            <Total
              label="Cases"
              number={<FormatNumber number={totals.positive} />}
            />
          </Col>
          <Col width={[4, 6, 4]}>
            <Total
              label="Deaths"
              number={<FormatNumber number={totals.death} />}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HomepageLatestTotals
