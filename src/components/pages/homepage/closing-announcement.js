import React from 'react'
import { Link } from 'gatsby'
import ColorBlock from './color-block'

const HomepageClosingAnnouncement = () => (
  <ColorBlock
    title="The COVID Tracking Project has come to an end."
    blue
    links={[
      <Link to="/data">See the data</Link>,
      <Link to="/about-data">About the data</Link>,
      <Link to="/about-data/data-summary">What to do now</Link>,
      <Link to="/about">About us</Link>,
    ]}
  >
    <p>
      Our final data data collection shift took place on March 7, 2021. Don’t
      worry, all our data is still here.
    </p>
  </ColorBlock>
)

export default HomepageClosingAnnouncement
