/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react'
import { Link, useStaticQuery, navigate, graphql } from 'gatsby'
import Expand from 'react-expand-animated'
import DevelopmentWarning from './development-warning'
import PartnershipBanner from './partnership-banner'
import SearchAutocomplete from './search-autocomplete'
import projectLogo from '../../images/project-logo.svg'
import atlanticLogo from '../../images/atlantic-logo.svg'
import headerStyle from './header.module.scss'
import searchIcon from '../../images/icons/search.svg'
import navCaretIcon from '../../images/icons/nav-caret.svg'
import searchIconInvert from '../../images/icons/search-inverted.svg'
import Container from '../common/container'
import colors from '../../scss/colors.module.scss'
import { useSearch } from '~context/search-context'
import withSearch from '~components/utils/with-search'

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

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

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

  const [menuState, setShowSubMenu] = useState()

  const ref = useRef()
  useOnClickOutside(ref, () => setShowSubMenu(menuState))
  // Call hook passing in the ref and a function to call on outside click

  const toggleSubMenu = index => {
    setShowSubMenu(menuState === index ? '' : index)
  }

  return (
    <nav className="js-disabled-block">
      <ul>
        {data.allNavigationYaml.edges[0].node.items.map((item, index) => (
          <li
            className={`${menuState === index ? headerStyle.showSubMenu : ''}`}
            key={item.link}
            ref={ref}
          >
            <Link to={item.link} aria-haspopup="true" aria-expanded="false">
              {item.title}
            </Link>
            <ul className="sub-menu" aria-label="Sub-menu">
              <li>
                <a href="#test">States / Territories</a>
              </li>
              <li>
                <a href="#test">Counties</a>
              </li>
              <li>
                <a href="#test">Historical Data</a>
              </li>
              <li>
                <a href="#test">API</a>
              </li>
              <li>
                <a href="#test">Racial Data Dashboard</a>
              </li>
              <li>
                <a href="#test">Nursing Home Data</a>
              </li>
            </ul>
            <button
              className={headerStyle.navCaret}
              type="button"
              aria-expanded={menuState === index}
              aria-label={menuState === index ? 'hide' : 'show'}
              onClick={() => {
                toggleSubMenu(index)
              }}
            >
              <img src={navCaretIcon} alt="" />
            </button>
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

const MobileMenu = () => {
  const searchInputRef = useRef()
  const [, searchDispatch] = useSearch()

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
          <label htmlFor="mobile-menu-search" className="a11y-only">
            Search
          </label>
          <input
            type="search"
            placeholder="Search"
            name="q"
            id="mobile-menu-search"
            autoComplete="off"
            ref={searchInputRef}
            onFocus={() => searchDispatch({ type: 'toggleAutocompleteFocus' })}
            onBlur={() => searchDispatch({ type: 'toggleAutocompleteFocus' })}
          />
        </form>
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
