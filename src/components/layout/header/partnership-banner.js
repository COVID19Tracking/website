import React from 'react'
import partnershipBanner from './partnership-banner.module.scss'

export default ({ content }) => (
  <div className={partnershipBanner.banner}>
    <span className={partnershipBanner.new}>New</span>
    {content}
  </div>
)
