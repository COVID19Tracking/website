/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useStaticQuery, navigate, graphql } from 'gatsby'
import Expand from 'react-expand-animated'
import classNames from 'classnames'
import DevelopmentWarning from './development-warning'
import PartnershipBanner from './partnership-banner'
import SearchAutocomplete from './search-autocomplete'
import Container from '../common/container'
import { useSearch } from '~context/search-context'
import withSearch from '~components/utils/with-search'

import colors from '../../scss/colors.module.scss'
import breakpoints from '~scss/breakpoints.module.scss'
import headerStyle from './header.module.scss'

import projectLogo from '../../images/project-logo.svg'
import atlanticLogo from '../../images/atlantic-logo.svg'
import searchIcon from '../../images/icons/search.svg'
import searchIconInvert from '../../images/icons/search-inverted.svg'

const expandStyles = {
  open: { background: colors.colorPlum800 },
}

const HeaderTabs = ({ navigation }) => (
  <div className={`site-header-tabs ${headerStyle.headerTabs}`}>
    <div>
      <ul>
        {navigation.map(item => (
          <li key={`header-tab-${item.link}`}>
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
  const [searchState] = useSearch()
  const { query, autocompleteHasFocus } = searchState
  return (
    <div className={headerStyle.searchInput}>
      {children}
      <button
        type="button"
        className={headerStyle.searchSubmit}
        aria-label="Submit search"
        onClick={() => query && navigate(`/search?q=${query}`)}
      >
        <img
          src={autocompleteHasFocus ? searchIconInvert : searchIcon}
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

const MobileMenu = ({ expanded }) => {
  const [searchState] = useSearch()
  const { query, isFetching } = searchState
  const [menuHeight, setMenuHeight] = useState({ initial: 0, current: 0 })
  const resultPopoverRef = React.createRef()
  const menuRef = useRef()

  // Set initial menu height value to reset later.
  useEffect(() => {
    if (expanded) {
      setMenuHeight({ ...menuHeight, initial: menuRef.current.offsetHeight })
    }
  }, [expanded])

  // When query changes,
  // either update menu min height (if needed) or reset to initial value
  useEffect(() => {
    if (
      query &&
      !isFetching &&
      resultPopoverRef.current &&
      resultPopoverRef.current.offsetHeight
    ) {
      setMenuHeight({
        ...menuHeight,
        current: Math.max(
          resultPopoverRef.current.offsetHeight + 75,
          menuHeight.initial,
        ),
      })
    } else if (!query) {
      setMenuHeight({ ...menuHeight, current: menuHeight.initial })
    }
  }, [query, isFetching])

  return (
    <div
      ref={menuRef}
      className={classNames(headerStyle.mobileMenu, {
        [headerStyle.mobileMenuExpanded]: expanded,
      })}
      style={{
        minHeight: `${menuHeight.current}px`,
      }}
    >
      <HeaderSearch>
        <SearchAutocomplete ref={resultPopoverRef} mobile visible={expanded} />
      </HeaderSearch>

      <HeaderNavigation />
      <Link to="/about-project/help" className={headerStyle.getInvolved}>
        Get Involved
      </Link>
      <div className={headerStyle.mobilePointer} />
    </div>
  )
}

const Header = withSearch(({ title, titleLink, noMargin, navigation }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Timeout id.
  let resizeTimeout
  const handleResize = () => {
    if (window.innerWidth >= breakpoints.viewportLg.split('px')[0]) {
      setShowMobileMenu(false)
    }
  }

  // Watch resizes to un-expand the menu in large viewports.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(handleResize, 250)
      })
    }
    return () => {
      // remove resize listener
      if (typeof window !== 'undefined') {
        clearTimeout(resizeTimeout)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <>
      <DevelopmentWarning />
      <header
        className={`site-header ${headerStyle.siteHeader} ${
          showMobileMenu ? headerStyle.showMobileMenu : ''
        } ${noMargin ? headerStyle.noMargin : ''}`}
      >
        <div className={`container ${headerStyle.container}`}>
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
            {!showMobileMenu && <PartnershipBanner />}
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
                    <SearchAutocomplete />
                  </HeaderSearch>
                  <Link
                    to="/about-project/help"
                    className={headerStyle.getInvolved}
                  >
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
})

export default Header
