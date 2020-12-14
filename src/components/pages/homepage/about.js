import React from 'react'
import { Link } from 'gatsby'
import HomepageWrapper from './wrapper'

const HomepageAbout = () => (
  <HomepageWrapper
    bottomMargin
    title="The COVID Tracking Project provides the most comprehensive data about COVID-19 in the US."
    links={[
      <Link to="/about-data">How to use the data</Link>,
      <Link to="/data/charts">Our charts</Link>,
    ]}
  />
)

export default HomepageAbout
