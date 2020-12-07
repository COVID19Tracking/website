import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import HomepageWrapper from './wrapper'

const HomepageAPI = () => (
  <HomepageWrapper>
    <Row>
      <Col width={[4, 6, 8]}>
        <h2>Our data API</h2>
        <p>
          Our public data API provides access to all of our data at a national
          and state level.
        </p>
      </Col>
      <Col width={[4, 6, 4]}>
        <ul>
          <li>
            <Link to="/data/api">All API information</Link>
          </li>
          <li>
            <a href="https://covidtrackingproject.statuspage.io/">
              Current API status
            </a>
          </li>
          <li>
            <a href="https://apichanges.covidtracking.com/">API change log</a>
          </li>
        </ul>
      </Col>
    </Row>
  </HomepageWrapper>
)

export default HomepageAPI
