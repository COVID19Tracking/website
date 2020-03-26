import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import DevelopmentWarning from './development-warning'
import '../../scss/components/header.scss'
import ProjectLogo from '../../images/project-logo.svg'

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

const Header = () => (
  <>
    <DevelopmentWarning />
    <header className="site-header">
      <div className="header-container">
        <a className="site-title" href="/">
          <img
            src={ProjectLogo}
            alt="The COVID Tracking Project"
            width="170px"
          />
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
        ></StaticQuery>
      </div>
    </header>
  </>
)

export default Header
