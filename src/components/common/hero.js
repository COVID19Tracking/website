import React from 'react'
import { Link } from 'gatsby'
import '../../scss/components/hero.scss'
import { ButtonLink } from './button'

export default () => (
  <div className="hero">
    <p className="header">
      The COVID Tracking Project aims to provide the most comprehensive testing data we can collect for the novel coronavirus, SARS-CoV-2.
    </p>
    <div className="ctas">
      <ButtonLink big to="/data">
        Get the Data
      </ButtonLink>
      <p className="cta-spacer">or</p>
      <Link to='/about'>Learn About the Data</Link>
    </div>
  </div>
)
