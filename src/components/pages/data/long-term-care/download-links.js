import React from 'react'
import { Link } from 'gatsby'
import { CtaAnchorLink, CtaLink } from '~components/common/call-to-action'
import StateNavigation from '~components/common/state-nav'
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
        <CtaLink to="/nursing-homes-long-term-care-facilities/history">
          View historical totals
        </CtaLink>
        <CtaAnchorLink
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pubhtml"
          block
        >
          View the spreadsheet
        </CtaAnchorLink>
        <p className={linksStyle.contact}>
          Do you have information about a long-term-care facility?{' '}
          <Link to="/nursing-homes-long-term-care-facilities/contact">
            We would love to hear from you
          </Link>
          .
        </p>
      </Col>
      <Col width={[4, 6, 4]} paddingLeft={[0, 0, 16]}>
        <div id="state-navigation" />
        <StateNavigation
          defaultIsOpen
          linkAs={({ state }) => (
            <Link
              to={`/data/state/${state.childSlug.slug}/long-term-care`}
              aria-label={state.name}
            >
              {state.state}
            </Link>
          )}
        />
      </Col>
    </Row>
  </div>
)

export default DataLongTermCareLinks
