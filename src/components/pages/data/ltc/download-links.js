import React from 'react'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import linksStyle from './download-links.module.scss'

export default () => (
  <div className={linksStyle.links}>
    <CtaLink
      to="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=1274701484&single=true&output=csv"
      bold
      centered
    >
      Download the dataset
    </CtaLink>
    <CtaLink
      to="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pub?gid=336757465&single=true&output=csv"
      centered
    >
      Download state notes
    </CtaLink>
    <CtaLink
      to="https://docs.google.com/spreadsheets/d/e/2PACX-1vRa9HnmEl83YXHfbgSPpt0fJe4SyuYLc0GuBAglF4yMYaoKSPRCyXASaWXMrTu1WEYp1oeJZIYHpj7t/pubhtml"
      centered
    >
      View the spreadsheet
    </CtaLink>
  </div>
)
