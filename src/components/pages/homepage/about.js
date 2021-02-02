import React from 'react'
import { Link } from 'gatsby'
import ColorBlock from './color-block'

const HomepageAbout = () => (
  <ColorBlock
    title="The COVID Tracking Project collects and publishes the most complete data about COVID-19 in the US."
    links={[
      <Link to="/data">See the data</Link>,
      <Link to="/about-data">About the data</Link>,
      <Link to="/blog">Our analysis &amp; updates</Link>,
      <Link to="/about">About us</Link>,
    ]}
  >
    <p>
      Every day, our volunteer teams compile the latest public health data from
      official US state, territorial, and federal sources.
    </p>
  </ColorBlock>
)

export default HomepageAbout
