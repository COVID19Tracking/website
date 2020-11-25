import React from 'react'
import { Link } from 'gatsby'
import Container from '~components/common/container'
import thanksgivingWarningStyle from './thanksgiving-warning.module.scss'

const ThanksgivingWarning = () => (
  <div className={thanksgivingWarningStyle.warning}>
    <Container>
      As the Thanksgiving holiday approaches, we expect{' '}
      <Link to="/blog/daily-covid-19-data-is-about-to-get-weird">
        significant disruptions in state reported data
      </Link>
      . We will continue to collect and report daily data and provide
      disclaimers as necessary.
    </Container>
  </div>
)

export default ThanksgivingWarning
