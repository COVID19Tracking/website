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
      href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTfUQPxkhP_CRcGmnnpUBihnTNZ9Z8pcizII4_sc2o2n3opOoAJdAM4CRTJBI339tou8LWnQrqbTMgH/pub?gid=902690690&single=true&output=csv"
    >
      Get the complete dataset (CSV)
    </CtaAnchorLink>
    <CtaLink centered to="/race/about">
      Learn more about the tracker
    </CtaLink>
  </div>
)
