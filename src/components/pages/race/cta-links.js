import React from 'react'
import {
  CtaLink,
  CtaAnchorLink,
} from '~components/common/landing-page/call-to-action'
import ctaLinksStyle from './cta-links.module.scss'

export default () => (
  <div className={ctaLinksStyle.links}>
    <CtaLink bold centered to="/race/dashboard">
      See the dashboard
    </CtaLink>
    <CtaAnchorLink
      centered
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vR_xmYt4ACPDZCDJcY12kCiMiH0ODyx3E1ZvgOHB8ae1tRcjXbs_yWBOA4j4uoCEADVfC1PS2jYO68B/pub?gid=43720681&single=true&output=csv"
    >
      Get the complete dataset (CSV)
    </CtaAnchorLink>
    <CtaLink centered to="/race/about">
      Learn more about the tracker
    </CtaLink>
  </div>
)
