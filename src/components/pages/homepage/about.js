import React from 'react'
import { Link } from 'gatsby'
import HomepageWrapper from './color-block'

const HomepageAbout = () => (
  <HomepageWrapper
    title="The COVID Tracking Project collects and publishes the most complete data about COVID-19 in the US."
    links={[
      <Link to="/data">See the data</Link>,
      <Link to="/about-data">About the data</Link>,
      <Link to="/blog">Our analysis &amp; updates</Link>,
    ]}
  />
)

export default HomepageAbout
