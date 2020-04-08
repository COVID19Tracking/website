import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Flex, Box } from '../common/flexbox'
import Container from '../common/container'
import DevelopmentWarning from './development-warning'
import Hero from './hero'
import ProjectLogo from '../../images/project-logo.svg'
import headerStyle from './header.module.scss'

const HeaderTabs = ({ navigation }) => (
  <div className={`site-header-tabs ${headerStyle.headerTabs}`}>
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
        className={`site-header ${headerStyle.siteHeader} ${
          showMobileMenu ? headerStyle.showMobileMenu : ''
        } ${noMargin ? headerStyle.noMargin : ''}`}
      >
        <div
          className={`${headerStyle.container} ${!hasHero &&
            headerStyle.showBackground}`}
        >
          <Container>
            <Flex flexWrap="wrap">
              <Box
                width={[1, 1 / 3]}
                className={headerStyle.siteTitleContainer}
              >
                <a className={headerStyle.siteTitle} href="/">
                  <img
                    src={ProjectLogo}
                    alt="The COVID Tracking Project"
                    width="176px"
                  />
                </a>
              </Box>
              <Box width={[1, 2 / 3]} className={headerStyle.navContainer}>
                <button
                  className={headerStyle.mobileToggle}
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
              className={headerStyle.titleSubnavContainer}
              mt={['1.5rem']}
            >
              <Box
                width={navigation ? [1, 1 / 2] : 1}
                order={[2, 1]}
                py={['0.5rem', 0]}
                className={headerStyle.title}
              >
                {title && (
                  <h1 className={`${navigation ? '' : headerStyle.extraSpace}`}>
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
                  className={headerStyle.tabContainer}
                >
                  <HeaderTabs navigation={navigation} />
                </Box>
              )}
            </Flex>
          </Container>
        </div>
      </header>
    </>
  )

  return hasHero ? (
    <div className={headerStyle.circles}>
      {header} <Hero />
    </div>
  ) : (
    header
  )
}

export default Header
