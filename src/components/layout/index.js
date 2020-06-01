import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import Header from './header'
import Footer from './footer'
import SEO from '~components/utils/seo'
import Container from '~components/common/container'
import SkipNavigation from '~components/utils/skip-navigation'
import '~scss/global.scss'

const Layout = ({
  title,
  displayTitle,
  titleLink,
  path,
  returnLink,
  returnLinkTitle,
  description,
  children,
  navigation,
  noMargin,
  hasHero,
  narrow,
  textHeavy,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavigation />
      <Header
        siteTitle={data.site.siteMetadata.title}
        title={displayTitle || title}
        titleLink={titleLink}
        navigation={navigation}
        path={path}
        noMargin={noMargin}
        hasHero={hasHero}
        returnLink={returnLink}
        returnLinkTitle={returnLinkTitle}
      />
      <main id="main">
        <SkipNavContent />
        <Container narrow={narrow} textHeavy={textHeavy}>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
