import React from 'react'
import { CtaAnchorLink } from '~components/common/landing-page/call-to-action'
import LtcStateNavigation from './state-navigation'
import { Row, Col } from '~components/common/grid'
import linksStyle from './download-links.module.scss'

const DataLongTermCareLinks = () => (
  <div className={linksStyle.section}>
    <Row>
      <Col width={[4, 4, 8]} className={linksStyle.links}>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=827060758&single=true&output=csv"
          bold
          block
        >
          Download the aggregate dataset
        </CtaAnchorLink>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv"
          bold
          block
        >
          Download the cumulative dataset
        </CtaAnchorLink>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv"
          bold
          block
        >
          Download the current outbreak dataset
        </CtaAnchorLink>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=336757465&single=true&output=csv"
          block
        >
          Download state notes
        </CtaAnchorLink>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pubhtml"
          block
        >
          View the spreadsheet
        </CtaAnchorLink>
      </Col>
      <Col width={[4, 6, 4]}>
        <LtcStateNavigation />
      </Col>
    </Row>
  </div>
)

export default DataLongTermCareLinks
