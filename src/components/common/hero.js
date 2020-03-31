import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/hero.scss'
import { ButtonLink } from './button'

export default () => (
  <div className="hero">
    <p className="header">
      The COVID Tracking Project obtains, organizes, and publishes high-quality,
      state-level data required to understand and respond to the COVID-19
      outbreak in the United States.
    </p>
    <div className="ctas">
      <ButtonLink big to="/data">
        Get the Data
      </ButtonLink>
      <p className="cta-spacer">or</p>
      <Link to="/about">Learn About the Data</Link>
    </div>
  </div>
)
