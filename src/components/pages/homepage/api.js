import React from 'react'
import { Link } from 'gatsby'
import ColorBlock from './color-block'

const HomepageAPI = () => (
  <ColorBlock
    title="Our data API"
    blue
    links={[
      <Link to="/data/api">All API information</Link>,
      <a href="https://covidtrackingproject.statuspage.io/">
        Current API status
      </a>,
      <a href="https://apichanges.covidtracking.com/">API change log</a>,
    ]}
    topMargin
    bottomMargin
  >
    <p>
      Our public data API provides access to all of our data at a national and
      state level.
    </p>
  </ColorBlock>
)

export default HomepageAPI
