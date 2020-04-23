import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
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
    <nav className="js-disabled-block">
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

const Header = ({ title, titleLink, noMargin, hasHero, navigation }) => {
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
            <div className={headerStyle.siteTitleContainer}>
              <div className={headerStyle.siteTitleInner}>
                <a className={headerStyle.siteTitle} href="/">
                  <img
                    src={ProjectLogo}
                    alt="The COVID Tracking Project"
                    width="176px"
                  />
                </a>
              </div>
              <div className={headerStyle.navContainer}>
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
              </div>
              <HeaderNavigation showMobileMenu={showMobileMenu} />
            </div>
            <div className={headerStyle.titleSubnavContainer}>
              <div className={headerStyle.title}>
                {title && (
                  <h1
                    className={`page-title ${headerStyle.pageTitle} ${
                      navigation ? '' : headerStyle.extraSpace
                    }`}
                  >
                    {titleLink ? (
                      <Link to={titleLink}>{title}</Link>
                    ) : (
                      <>{title}</>
                    )}
                  </h1>
                )}
              </div>
              {navigation && (
                <div className={headerStyle.tabContainer}>
                  <HeaderTabs navigation={navigation} />
                </div>
              )}
            </div>
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
