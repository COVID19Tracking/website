/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Expand from 'react-expand-animated'
import { useSearch } from '~context/search-context'

import DevelopmentWarning from './development-warning'
import PartnershipBanner from './partnership-banner'
import HeaderNavigation from './navigation'
import Container from '~components/common/container'
import withSearch from '~components/utils/with-search'

import colors from '~scss/colors.module.scss'
import breakpoints from '~scss/breakpoints.module.scss'
import headerStyle from './header.module.scss'

import projectLogo from '~images/project-logo.svg'
import atlanticLogo from '~images/atlantic-logo.svg'

import MobileMenu from './mobile-menu'
import HeaderSubNavigation from './sub-navigation'
import ReturnLink from './return-link'
import HeaderSearch from './search'

const expandStyles = {
  open: { background: colors.colorPlum800 },
}

const Header = withSearch(
  ({
    title,
    titleLink,
    noMargin,
    navigation,
    forceSubNavigation,
    path,
    returnLink,
    returnLinkTitle,
    hero,
    centerTitle,
  }) => {
    const data = useStaticQuery(graphql`
      query {
        navigationYaml(name: { eq: "header" }) {
          items {
            link
            title
            subNavigation
          }
        }
        allContentfulNavigationGroup {
          nodes {
            slug
            pages {
              title
              link: url
            }
          }
        }
      }
    `)
    const subNavigation = {}
    let pathNavigation = false
    data.allContentfulNavigationGroup.nodes.forEach(node => {
      subNavigation[node.slug] = node.pages
    })
    const topNavigation = data.navigationYaml.items
    if (returnLink && returnLinkTitle) {
      pathNavigation = {
        top: false,
        parent: {
          link: returnLink,
          title: returnLinkTitle,
        },
      }
    }
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

    const searchState = useSearch()[0]
    const { autocompleteHasFocus } = searchState

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
            <div className={headerStyle.wrapper}>
              <div className={headerStyle.siteTitleContainer}>
                <div className={headerStyle.siteTitleInner}>
                  <Link to="/" className={headerStyle.projectLogo}>
                    <img
                      src={projectLogo}
                      alt="The COVID Tracking Project"
                      width="176px"
                    />
                  </Link>
                </div>
                {(showMobileMenu || !autocompleteHasFocus) && (
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
                    <HeaderNavigation
                      topNavigation={topNavigation}
                      subNavigation={subNavigation}
                    />
                  </div>
                )}
                <div className={headerStyle.tools}>
                  <div className={headerStyle.searchContainer}>
                    <HeaderSearch />
                  </div>
                  <Link
                    to="/contact/volunteer"
                    className={headerStyle.getInvolved}
                  >
                    Get involved
                  </Link>
                </div>
              </div>
              <div className={headerStyle.atlanticBanner}>
                <span>At</span> <img src={atlanticLogo} alt="The Atlantic" />
                <div />
              </div>
            </div>
            <Container centered={centerTitle}>
              {title && !hero && (
                <div
                  className={`${headerStyle.titleSubnavContainer} ${
                    pathNavigation && !pathNavigation.top
                      ? headerStyle.hasReturnLink
                      : ''
                  }`}
                >
                  <div className={headerStyle.title}>
                    {pathNavigation && !forceSubNavigation && (
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
                  {navigation && (pathNavigation.top || forceSubNavigation) && (
                    <div className={headerStyle.tabContainer}>
                      <HeaderSubNavigation navigation={navigation} />
                    </div>
                  )}
                </div>
              )}
              {hero}
            </Container>
          </div>
        </header>
      </>
    )
  },
)

export default Header
