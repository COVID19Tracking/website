import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Flex, Box } from 'reflexbox'
import DevelopmentWarning from './development-warning'
import HeaderTabs from './header-tabs'
import ProjectLogo from '../../images/project-logo.svg'
import '../../scss/components/header.scss'

const HeaderNavigation = () => {
  const data = useStaticQuery(graphql`
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
  `)
  return (
    <nav>
      <ul>
        {data.allNavigationYaml.edges[0].node.items.map(item => (
          <li key={item.link}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const Header = ({ title, showTabbedNavigation }) => (
  <>
    <DevelopmentWarning />
    <header className="site-header">
      <div className="header-container">
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 3]}>
            <a className="site-title" href="/">
              <img
                src={ProjectLogo}
                alt="The COVID Tracking Project"
                width="170px"
              />
            </a>
          </Box>
          <Box width={[1, 2 / 3]}>
            <HeaderNavigation />
          </Box>
        </Flex>
        <Flex flexWrap="wrap">
          <Box
            width={showTabbedNavigation ? [1, 1 / 2] : 1}
            order={[2, 1]}
            py={['0.5rem', '1rem']}
          >
            {title && <h1>{title}</h1>}
          </Box>
          {showTabbedNavigation && (
            <Box
              width={[1, 1 / 2]}
              order={[1, 2]}
              textAlign={['left', 'right']}
            >
              <HeaderTabs />
            </Box>
          )}
        </Flex>
      </div>
    </header>
  </>
)

export default Header
