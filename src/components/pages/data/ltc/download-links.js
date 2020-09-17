import React from 'react'
import { CtaAnchorLink } from '~components/common/landing-page/call-to-action'
import linksStyle from './download-links.module.scss'

const DataLongTermCareLinks = () => (
  <div className={linksStyle.links}>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=827060758&single=true&output=csv"
      bold
      centered
    >
      Download the aggregate dataset
    </CtaAnchorLink>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv"
      bold
      centered
    >
      Download the cumulative dataset
    </CtaAnchorLink>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=467018747&single=true&output=csv"
      bold
      centered
    >
      Download the current outbreak dataset
    </CtaAnchorLink>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=299613558&single=true&output=csv"
      centered
    >
      Download state notes
    </CtaAnchorLink>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pubhtml"
      centered
    >
      View the spreadsheet
    </CtaAnchorLink>
  </div>
)

export default DataLongTermCareLinks
