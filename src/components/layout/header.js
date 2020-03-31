import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Flex, Box } from '../common/flexbox'
import DevelopmentWarning from './development-warning'
import Hero from '../common/hero'
import ProjectLogo from '../../images/project-logo.svg'
import '../../scss/components/header.scss'

const HeaderTabs = ({ navigation }) => (
  <div className="header-tabs">
    <div>
      <ul>
        {navigation.map(item => (
          <li key={item.link}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

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
    <>
      <noscript>
        <style>
          {`.site-header nav {
          display: block !important;
        }`}
        </style>
      </noscript>
      <nav>
        <ul>
          {data.allNavigationYaml.edges[0].node.items.map(item => (
            <li key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

const Header = ({ title, noMargin, hasHero, navigation }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const header = (
    <>
      <DevelopmentWarning />
      <header
        className={`site-header ${showMobileMenu ? 'show-mobile-menu' : ''} ${
          noMargin ? 'no-margin' : ''
        }`}
      >
        <div className={`header-container ${!hasHero && 'show-background'}`}>
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 3]} className="site-title-container">
              <a className="site-title" href="/">
                <img
                  src={ProjectLogo}
                  alt="The COVID Tracking Project"
                  width="176px"
                />
              </a>
            </Box>
            <Box width={[1, 2 / 3]} className="header-nav-container">
              <button
                className="mobile-toggle"
                type="button"
                aria-expanded={showMobileMenu}
                onClick={() => {
                  setShowMobileMenu(!showMobileMenu)
                }}
              >
                {showMobileMenu ? <>Close</> : <>Menu</>}
              </button>
            </Box>
            <HeaderNavigation showMobileMenu={showMobileMenu} />
          </Flex>
          <Flex
            flexWrap="wrap"
            className="title-subnav-container"
            mt={['1.5rem']}
          >
            <Box
              width={navigation ? [1, 1 / 2] : 1}
              order={[2, 1]}
              py={['0.5rem', 0]}
              className="header-title"
            >
              {title && (
                <h1 className={`${navigation ? '' : 'extra-space'}`}>
                  {title}
                </h1>
              )}
            </Box>
            {navigation && (
              <Box
                width={[1]}
                order={[1, 2]}
                px={[0]}
                textAlign={['left', 'right']}
                className="header-tabs-container"
              >
                <HeaderTabs navigation={navigation} />
              </Box>
            )}
          </Flex>
        </div>
      </header>
    </>
  )

  return hasHero ? (
    <div className="circles-container">
      {header} <Hero />
    </div>
  ) : (
    header
  )
}

export default Header
