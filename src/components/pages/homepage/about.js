import React from 'react'
import { Link } from 'gatsby'
import HomepageWrapper from './color-block'

const HomepageAbout = () => (
  <HomepageWrapper
    title="The COVID Tracking Project provides the most comprehensive data about COVID-19 in the US."
    links={[
      <Link to="/blog">Our analysis &amp; updates</Link>,
      <Link to="/about-data">How to use the data</Link>,
    ]}
  />
)

export default HomepageAbout
