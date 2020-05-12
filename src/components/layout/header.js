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

const HeaderNavigation = ({ topNavigation, subNavigation }) => {
  const [menuState, setShowSubMenu] = useState()

  const ref = useRef()
  useOnClickOutside(ref, () => setShowSubMenu(menuState))

  const toggleSubMenu = index => {
    setShowSubMenu(menuState === index ? '' : index)
  }

  return (
    <nav className="js-disabled-block" role="navigation">
      <ul role="menubar">
        {topNavigation.map((item, index) => (
          <li
            role="menuitem"
            aria-haspopup={item.subNavigation ? 'true' : false}
            className={menuState === index ? headerStyle.showSubMenu : ''}
            key={item.link}
            ref={ref}
          >
            <Link to={item.link}>{item.title}</Link>
            {item.subNavigation &&
              typeof subNavigation[item.subNavigation] !== 'undefined' && (
                <>
                  <ul>
                    {subNavigation[item.subNavigation].map(subItem => (
                      <li key={subItem.link}>
                        <Link to={subItem.link}>{subItem.title}</Link>
                      </li>
                    ))}
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
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.59523 6.56387C5.7446 6.71053 5.91203 6.7381 6.0001 6.7381C6.09838 6.7381 6.25421 6.71136 6.40443 6.56387L10.9015 1.76778C11.1074 1.5483 11.093 1.20669 10.8695 1.00471C10.6459 0.802637 10.298 0.817297 10.0924 1.03625L5.99993 5.40006L1.90754 1.03625C1.70151 0.816664 1.35357 0.802742 1.13034 1.00471C0.906907 1.20669 0.892512 1.5483 1.09823 1.76778L5.59523 6.56387Z" />
                    </svg>
                  </button>
                </>
              )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

const ReturnLink = ({ currentItem }) => {
  if (!currentItem || currentItem.top) {
    return null
  }
  return (
    <div className={headerStyle.returnLink}>
      <Link to={currentItem.parent.link}>
        <span aria-hidden>←</span> {currentItem.parent.title}
      </Link>
    </div>
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

const MobileMenu = ({ topNavigation, subNavigation }) => {
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

      <HeaderNavigation
        topNavigation={topNavigation}
        subNavigation={subNavigation}
      />
      <Link to="/about-project/help" className={headerStyle.getInvolved}>
        Get Involved
      </Link>
      <div className={headerStyle.mobilePointer} />
    </div>
  )
}

const Header = withSearch(
  ({ title, titleLink, noMargin, navigation, path }) => {
    const data = useStaticQuery(graphql`
      query {
        allNavigationYaml(filter: { name: { eq: "header" } }) {
          edges {
            node {
              items {
                link
                title
                subNavigation
              }
            }
          }
        }
        allContentfulNavigationGroup {
          edges {
            node {
              slug
              pages {
                ... on ContentfulPage {
                  title
                  link: slug
                }
                ... on ContentfulNavigationLink {
                  title
                  link: url
                }
              }
            }
          }
        }
      }
    `)
    const subNavigation = {}
    let pathNavigation = false
    data.allContentfulNavigationGroup.edges.forEach(({ node }) => {
      subNavigation[node.slug] = node.pages
    })
    const topNavigation = data.allNavigationYaml.edges[0].node.items
    topNavigation.forEach(item => {
      if (item.link === path) {
        pathNavigation = {
          top: true,
          parent: false,
        }
        return
      }
      if (typeof subNavigation[item.subNavigation] !== 'undefined') {
        subNavigation[item.subNavigation].forEach(sub => {
          if (
            sub.link.replace(/^\/|\/$/g, '') === path.replace(/^\/|\/$/g, '')
          ) {
            pathNavigation = {
              top: false,
              parent: item,
            }
          }
        })
      }
    })

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
              <MobileMenu
                expanded={showMobileMenu}
                topNavigation={topNavigation}
                subNavigation={subNavigation}
              />
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
                  <HeaderNavigation
                    topNavigation={topNavigation}
                    subNavigation={subNavigation}
                  />
                </div>
              </div>
              <div className={headerStyle.atlanticBanner}>
                <span>From</span> <img src={atlanticLogo} alt="The Atlantic" />
                <div />
              </div>
              <div
                className={`${headerStyle.titleSubnavContainer} ${
                  pathNavigation && !pathNavigation.top
                    ? headerStyle.hasReturnLink
                    : ''
                }`}
              >
                <div className={headerStyle.title}>
                  {navigation && <ReturnLink currentItem={pathNavigation} />}
                  {title && (
                    <h1 className={`page-title ${headerStyle.pageTitle}`}>
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
  },
)

export default Header
