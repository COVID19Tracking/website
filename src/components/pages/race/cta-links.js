import React from 'react'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import ctaLinksStyle from './cta-links.module.scss'

export default () => (
  <div className={ctaLinksStyle.links}>
    <CtaLink bold centered to="/race/dashboard">
      See the dashboard
    </CtaLink>
    <CtaLink centered to="/race/cdv">
      Get the complete dataset (CSV)
    </CtaLink>
    <CtaLink centered to="/race/about">
      Learn more about the tracker
    </CtaLink>
  </div>
)
