import React from 'react'
import { Link } from 'gatsby'
import partnershipBanner from './partnership-banner.module.scss'

export default () => (
  <div className={partnershipBanner.banner}>
    <span className={partnershipBanner.new}>New</span>{' '}
    <Link
      to="/race"
      onClick={() => {
        if (
          typeof window !== 'undefined' &&
          typeof window.fathom !== 'undefined'
        ) {
          window.fathom.trackGoal('3GO7TUHI', 0)
        }
      }}
    >
      We just launched the COVID Racial Data Tracker
    </Link>
  </div>
)
