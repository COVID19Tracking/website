import React from 'react'
import { Link } from 'gatsby'
import HomepageWrapper from './wrapper'

const HomepageAbout = () => (
  <HomepageWrapper
    title="Snappy headline about the project"
    links={[
      <Link to="/about-data">How to use the data</Link>,
      <Link to="/data/charts">Our charts</Link>,
    ]}
  >
    <p>
      Every day, our volunteers compile the latest numbers on tests, cases,
      hospitalizations, and patient outcomes from every US state and territory.
    </p>
  </HomepageWrapper>
)

export default HomepageAbout
