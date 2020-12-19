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
    ]}
  >
    <p>
      Our staff and volunteers collect and annotate data on tests, cases,
      hospitalizations, deaths, nursing home statistics, and race and ethnicity
      from official public state and territorial sources.
    </p>
  </ColorBlock>
)

export default HomepageAbout
