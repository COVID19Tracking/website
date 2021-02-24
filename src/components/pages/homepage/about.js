import React from 'react'
import { Link } from 'gatsby'
import ColorBlock from './color-block'

const HomepageAbout = () => (
  <ColorBlock
    title="We're done here."
    links={[
      <Link to="/data">See the data</Link>,
      <Link to="/about-data">About the data</Link>,
      <Link to="/blog">What to do now</Link>,
      <Link to="/about">About us</Link>,
    ]}
  >
    <p>
      March 7 was our last date of collecting data. Don&apos;t worry, all our
      data is still here.
    </p>
  </ColorBlock>
)

export default HomepageAbout
