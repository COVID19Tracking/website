import React, { useState, useRef } from 'react'
import { Link, useStaticQuery, navigate, graphql } from 'gatsby'
import Expand from 'react-expand-animated'
import DevelopmentWarning from './development-warning'
import PartnershipBanner from './partnership-banner'
import SearchAutocomplete from './search-autocomplete'
import Hero from './hero'
import projectLogo from '../../images/project-logo.svg'
import atlanticLogo from '../../images/atlantic-logo.svg'
import headerStyle from './header.module.scss'
import searchIcon from '../../images/icons/search.svg'
import Container from '../common/container'
import colors from '../../scss/colors.module.scss'

const expandStyles = {
  open: { background: colors.colorPlum800 },
}

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

const HeaderSearch = ({ children }) => {
  return (
    <div className={headerStyle.searchInput}>
      <img src={searchIcon} alt="" aria-hidden="true" />
      {children}
    </div>
  )
}

const MobileMenu = () => {
  const searchInputRef = useRef()

  return (
    <div className={headerStyle.mobileMenu}>
      <HeaderSearch>
        <form
          method="get"
          action="/search"
          onSubmit={event => {
            event.preventDefault()
            navigate(`/search?q=${searchInputRef.current.value}`)
          }}
        >
          <input
            type="text"
            placeholder="Search"
            name="q"
            autoComplete="off"
            ref={searchInputRef}
          />
        </form>
      </HeaderSearch>

      <HeaderNavigation />
      <Link to="/help" className={headerStyle.getInvolved}>
        Get Involved
      </Link>
      <div className={headerStyle.mobilePointer} />
    </div>
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
          className={`container ${headerStyle.container} ${
            !hasHero ? headerStyle.showBackground : ''
          } `}
        >
          <Expand
            open={showMobileMenu}
            styles={expandStyles}
            duration={500}
            transitions={['height', 'opacity', 'background']}
          >
            <MobileMenu expanded={showMobileMenu} />
          </Expand>
          <Expand
            open={!showMobileMenu}
            styles={expandStyles}
            duration={500}
            transitions={['height', 'opacity', 'background']}
          >
            <PartnershipBanner />
          </Expand>
          <Container>
            <div className={headerStyle.siteTitleContainer}>
              <div className={headerStyle.siteTitleInner}>
                <Link to="/">
                  <img
                    src={projectLogo}
                    alt="The COVID Tracking Project"
                    width="176px"
                  />
                </Link>
              </div>
              <div className={headerStyle.siteNavContainer}>
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
                <div className={headerStyle.tools}>
                  <HeaderSearch>
                    <SearchAutocomplete id="header-search" />
                  </HeaderSearch>
                  <Link to="/help" className={headerStyle.getInvolved}>
                    Get involved
                  </Link>
                </div>
                <HeaderNavigation />
              </div>
            </div>
            <div className={headerStyle.atlanticBanner}>
              <span>From</span> <img src={atlanticLogo} alt="The Atlantic" />
              <div />
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
