import React from 'react'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import linksStyle from './download-links.module.scss'

export default () => (
  <div className={linksStyle.links}>
    <CtaLink to="#download" bold centered>
      Download the dataset
    </CtaLink>
    <CtaLink to="#download" centered>
      Download state notes
    </CtaLink>
    <CtaLink to="#download" centered>
      View the spreadsheet
    </CtaLink>
  </div>
)
