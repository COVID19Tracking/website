import React from 'react'
import { CtaAnchorLink } from '~components/common/landing-page/call-to-action'
import linksStyle from './download-links.module.scss'

export default () => (
  <div className={linksStyle.links}>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=827060758&single=true&output=csv"
      bold
      centered
    >
      Download the dataset
    </CtaAnchorLink>
    <CtaAnchorLink
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=336757465&single=true&output=csv"
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
