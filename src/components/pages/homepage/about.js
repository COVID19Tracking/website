import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import HomepageWrapper from './wrapper'

const HomepageAbout = () => (
  <HomepageWrapper>
    <Row>
      <Col width={[4, 6, 8]}>
        <p>
          Every day, our volunteers compile the latest numbers on tests, cases,
          hospitalizations, and patient outcomes from every US state and
          territory.
        </p>
      </Col>
      <Col width={[4, 6, 4]}>
        <ul>
          <li>
            <Link to="/about-data">How to use the data</Link>
          </li>
          <li>
            <Link to="/data/charts">Our charts</Link>
          </li>
        </ul>
      </Col>
    </Row>
  </HomepageWrapper>
)

export default HomepageAbout
