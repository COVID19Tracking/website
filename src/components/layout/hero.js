import React from 'react'
import { Link } from 'gatsby'
import Container from '../common/container'
import heroStyle from './hero.module.scss'

export default () => (
  <Container>
    <div className={`hero ${heroStyle.hero}`}>
      <p className={heroStyle.header}>
        The COVID Tracking Project collects and publishes the most complete
        testing data available for US states and territories.
      </p>
      <div className={heroStyle.ctas}>
        <Link className={heroStyle.button} to="/data">
          Get the Data
        </Link>
        <span>or</span>
        <Link to="/about-data">Learn About the Data</Link>
      </div>
    </div>
  </Container>
)
