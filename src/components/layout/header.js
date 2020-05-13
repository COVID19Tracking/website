/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react'
import { graphql, Link, navigate, useStaticQuery } from 'gatsby'
import Expand from 'react-expand-animated'
import classNames from 'classnames'
import DevelopmentWarning from './development-warning'
import PartnershipBanner from './partnership-banner'
import SearchAutocomplete from './search-autocomplete'
import HeaderNavigation from './header-navigation'
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

const ReturnLink = ({ currentItem, returnLinkTitle }) => {
  if (!currentItem || currentItem.top) {
    return null
  }
  return (
    <div className={headerStyle.returnLink}>
      <Link to={currentItem.parent.link}>
        <span aria-hidden>←</span>{' '}
        {returnLinkTitle ? (
          <>{returnLinkTitle}</>
        ) : (
          <>{currentItem.parent.title}</>
        )}
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

const MobileMenu = ({ expanded, topNavigation, subNavigation }) => {
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

      <HeaderNavigation
        topNavigation={topNavigation}
        subNavigation={subNavigation}
        isMobile
      />
      <Link to="/about-project/help" className={headerStyle.getInvolved}>
        Get Involved
      </Link>
      <div className={headerStyle.mobilePointer} />
    </div>
  )
}

const Header = withSearch(
  ({
    title,
    titleLink,
    noMargin,
    navigation,
    path,
    returnLink,
    returnLinkTitle,
  }) => {
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
      if (
        returnLink &&
        returnLink.replace(/^\/|\/$/g, '') === item.link.replace(/^\/|\/$/g, '')
      ) {
        pathNavigation = {
          top: false,
          parent: item,
        }
        return
      }
      if (
        !returnLink &&
        typeof subNavigation[item.subNavigation] !== 'undefined'
      ) {
        subNavigation[item.subNavigation].forEach(sub => {
          if (
            sub.link &&
            path &&
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
          <div
            className={`container ${headerStyle.container} ${
              navigation && pathNavigation && pathNavigation.top
                ? headerStyle.hasNavigation
                : ''
            }`}
          >
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
              {title && (
                <div
                  className={`${headerStyle.titleSubnavContainer} ${
                    pathNavigation && !pathNavigation.top
                      ? headerStyle.hasReturnLink
                      : ''
                  }`}
                >
                  <div className={headerStyle.title}>
                    {pathNavigation && (
                      <ReturnLink
                        currentItem={pathNavigation}
                        returnLinkTitle={returnLinkTitle}
                      />
                    )}

                    <h1 className={`page-title ${headerStyle.pageTitle}`}>
                      {titleLink ? (
                        <Link to={titleLink}>{title}</Link>
                      ) : (
                        <>{title}</>
                      )}
                    </h1>
                  </div>
                  {navigation && pathNavigation.top && (
                    <div className={headerStyle.tabContainer}>
                      <HeaderTabs navigation={navigation} />
                    </div>
                  )}
                </div>
              )}
            </Container>
          </div>
        </header>
      </>
    )
  },
)

export default Header
