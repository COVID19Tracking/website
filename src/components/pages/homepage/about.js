import React from 'react'
import { Link } from 'gatsby'
import ColorBlock from './color-block'

const HomepageAbout = () => (
  <ColorBlock
    title="Our data compilation is finished. Our research and analysis work continues through May."
    links={[
      <Link to="/analysis-updates">See our analysis</Link>,
      <Link to="/data">See historical data</Link>,
      <Link to="/about-data/data-summary">Get fresh federal data</Link>,
      <Link to="/about">About us</Link>,
    ]}
    topMargin
  >
    <p>
      Our final data collection shift took place on March 7, 2021. Don’t worry,
      all our data is still here.
    </p>
  </ColorBlock>
)

export default HomepageAbout
