import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import Paragraph from '~components/common/landing-page/paragraph'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import Total from '~components/common/landing-page/total'
import latestTotalsStyles from './latest-totals.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    {
      covidUs {
        posNeg
        positive
        death
      }
    }
  `)
  const totals = data.covidUs
  return (
    <div className={latestTotalsStyles.container}>
      <Paragraph>
        Every day, our volunteers compile the latest numbers on tests, cases,
        hospitalizations, and patient outcomes from every US state and
        territory.
      </Paragraph>
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
              number={<FormatNumber number={totals.posNeg} />}
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
