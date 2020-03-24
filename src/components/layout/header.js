import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import DevelopmentWarning from './development-warning'

const Header = ({ siteTitle }) => (
  <>
    <DevelopmentWarning />
    <header className="site-header">
      <div className="container">
        <a className="site-title" href="/">
          {siteTitle}
        </a>

        <nav>
          <ul className="site-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/us-daily">US Historical Data</Link>
            </li>
            <li>
              <Link to="/data">Most Recent Data</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
