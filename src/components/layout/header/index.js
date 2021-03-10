/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Expand from 'react-expand-animated'
import classnames from 'classnames'
import { useSearch } from '~context/search-context'

import DevelopmentWarning from './development-warning'
import HeaderNavigation from './navigation'
import Container from '~components/common/container'
import withSearch from '~components/utils/with-search'

import colors from '~scss/colors.module.scss'
import breakpoints from '~scss/breakpoints.module.scss'
import headerStyle from './header.module.scss'
import mobileMenuStyle from './mobile-menu.module.scss'

import projectLogo from '~images/project-logo.svg'
import projectLogoPlum from '~images/project-logo-plum.svg'
import atlanticLogo from '~images/atlantic-logo.svg'
import atlanticLogoPlum from '~images/atlantic-logo-plum.svg'

import MobileMenu from './mobile-menu'
import HeaderSubNavigation from './sub-navigation'
import ReturnLinks from './return-links'
import Tools from './tools'

const expandStyles = {
  open: { background: colors.colorPlum800 },
}

const Header = withSearch(
  ({
    title,
    titleLink,
    noMargin,
    forceSubNavigation,
    path,
    returnLinks,
    returnLinksContent,
    hero,
    centerTitle,
    flipColors = false,
    hideWarning = false,
    forceSubNavigationKey,
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
    if (returnLinks) {
      pathNavigation = {
        top: false,
      }
    }
    topNavigation.forEach(item => {
      if (item.link === path) {
        pathNavigation = {
          top: true,
          parent: false,
          subNavigation: subNavigation[item.subNavigation],
        }
        return
      }
      if (
        !returnLinks &&
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
              subNavigation: false,
            }
          }
        })
      }
    })

    if (forceSubNavigationKey) {
      pathNavigation = {
        top: true,
        parent: false,
        subNavigation: subNavigation[forceSubNavigationKey],
      }
    }

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
          className={classnames(
            'site-header',
            headerStyle.siteHeader,
            flipColors && headerStyle.flipColors,
            showMobileMenu && headerStyle.showMobileMenu,
            noMargin && headerStyle.noMargin,
          )}
        >
          <div
            className={classnames(
              'container',
              headerStyle.container,
              flipColors && headerStyle.flipColors,

              pathNavigation &&
                pathNavigation.top &&
                pathNavigation.subNavigation &&
                headerStyle.hasNavigation,
            )}
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
                hide={() => {
                  showMobileMenu(false)
                }}
              />
            </Expand>
            <div className={headerStyle.wrapper}>
              <div className={headerStyle.siteTitleContainer}>
                <div className={headerStyle.siteTitleInner}>
                  <Link to="/" className={headerStyle.projectLogo}>
                    <img
                      src={flipColors ? projectLogoPlum : projectLogo}
                      alt="The COVID Tracking Project"
                      width="176px"
                    />
                  </Link>
                </div>
                {(showMobileMenu || !autocompleteHasFocus) && (
                  <div className={headerStyle.navContainer}>
                    <button
                      className={classnames(
                        flipColors && mobileMenuStyle.flipColors,
                        mobileMenuStyle.mobileToggle,
                      )}
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
                      flipColors={flipColors}
                    />
                  </div>
                )}
                <Tools />
              </div>
              <div className={headerStyle.atlanticBanner}>
                <span>At</span>{' '}
                <img
                  src={flipColors ? atlanticLogoPlum : atlanticLogo}
                  alt="The Atlantic"
                />
                <div />
              </div>
            </div>
            <Container centered={centerTitle}>
              {title && !hero && (
                <div
                  className={classnames(
                    headerStyle.titleSubnavContainer,
                    pathNavigation &&
                      !pathNavigation.top &&
                      headerStyle.hasReturnLink,
                  )}
                >
                  <div className={headerStyle.title}>
                    {pathNavigation && !forceSubNavigation && (
                      <>
                        {returnLinksContent ? (
                          <ReturnLinks>{returnLinksContent}</ReturnLinks>
                        ) : (
                          <ReturnLinks
                            topNavigation={topNavigation}
                            links={returnLinks}
                            pathNavigation={pathNavigation}
                          />
                        )}
                      </>
                    )}

                    <h1
                      className={classnames(
                        'page-title',
                        headerStyle.pageTitle,
                      )}
                    >
                      {titleLink ? (
                        <Link to={titleLink}>{title}</Link>
                      ) : (
                        <>{title}</>
                      )}
                    </h1>
                  </div>
                  {pathNavigation.top && pathNavigation.subNavigation && (
                    <div className={headerStyle.tabContainer}>
                      <HeaderSubNavigation
                        navigation={pathNavigation.subNavigation}
                      />
                    </div>
                  )}
                </div>
              )}
              {hero}
            </Container>
            {!hideWarning && (
              <div className={headerStyle.shutdownBox}>
                <Container>
                  As of <strong>March 7, 2021</strong> we are{' '}
                  <Link to="/analysis-updates/giving-thanks-and-looking-ahead-our-data-collection-work-is-done">
                    no longer collecting new data
                  </Link>
                  .{' '}
                  <Link to="/analysis-updates/federal-covid-data-101-how-to-find-data">
                    Learn about available federal data
                  </Link>
                  .
                </Container>
              </div>
            )}
          </div>
        </header>
      </>
    )
  },
)

export default Header
