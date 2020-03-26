import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import DevelopmentWarning from './development-warning'
import '../../scss/components/header.scss'

const HeaderNavigation = ({ navigation }) => (
  <nav>
    <ul>
      {navigation.map(item => (
        <li key={item.link}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

const Header = ({ siteTitle }) => (
  <>
    <DevelopmentWarning />
    <header className="site-header">
      <div className="container">
        <a className="site-title" href="/">
          {siteTitle}
        </a>
        <StaticQuery
          query={graphql`
            query {
              allNavigationYaml(filter: { name: { eq: "header" } }) {
                edges {
                  node {
                    items {
                      link
                      title
                    }
                  }
                }
              }
            }
          `}
          render={data => (
            <HeaderNavigation
              navigation={data.allNavigationYaml.edges[0].node.items}
            />
          )}
        />
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
