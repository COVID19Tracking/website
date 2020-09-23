import React from 'react'
import { Row, Col } from '~components/common/grid'
import Total from '~components/common/landing-page/total'
import { CtaAnchorLink } from '~components/common/landing-page/call-to-action'
import OverviewWrapper from '~components/common/overview-wrapper'
import { FormatNumber } from '~components/utils/format'

const LongTermCareOverview = ({ facilities, overview }) => {
  let totalDeath = 0
  let totalCases = 0
  Object.keys(overview).forEach(key => {
    if (key.search(/PosRes|PosStaff/) > -1) {
      totalCases += parseInt(overview[key], 10)
    }
    if (key.search(/DeathRes|DeathStaff/) > -1) {
      totalDeath += parseInt(overview[key], 10)
    }
  })
  return (
    <OverviewWrapper>
      <Row>
        <Col width={[4, 6, 3]}>
          <Total
            label="Total cases"
            number={<FormatNumber number={totalCases} />}
          />
        </Col>
        <Col width={[4, 6, 3]}>
          <Total
            label="Total deaths"
            number={<FormatNumber number={totalDeath} />}
          />
        </Col>
        <Col width={[4, 6, 3]}>
          <Total
            label="Facilities tracked"
            number={<FormatNumber number={facilities} />}
          />
        </Col>
        <Col width={[4, 6, 3]}>
          <CtaAnchorLink block href="#summary">
            State overview
          </CtaAnchorLink>
          <CtaAnchorLink block href="#notes">
            State notes
          </CtaAnchorLink>
          <CtaAnchorLink block href="#facilities">
            All facilities
          </CtaAnchorLink>
        </Col>
      </Row>
    </OverviewWrapper>
  )
}

export default LongTermCareOverview
