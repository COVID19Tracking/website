import React from 'react'
import { Link } from 'gatsby'
import Container from './container'
import '../../scss/components/hero.scss'
import { ButtonLink } from './button'

export default () => (
  <Container>
    <div className="hero">
      <p className="header">
        The COVID Tracking Project collects and publishes the most complete
        testing data available for US states and territories.
      </p>
      <div className="ctas">
        <ButtonLink big to="/data">
          Get the Data
        </ButtonLink>
        <p className="cta-spacer">or</p>
        <Link to="/about-data">Learn About the Data</Link>
      </div>
    </div>
  </Container>
)
