import React from 'react'
import { Link } from 'gatsby'
import partnershipBanner from '~components/layout/header/partnership-banner.module.scss'

export default () => (
  <div className={partnershipBanner.banner}>
    <span className={partnershipBanner.new}>New</span>{' '}
    <Link to="/race">We just launched the COVID Racial Data Tracker</Link>
  </div>
)
