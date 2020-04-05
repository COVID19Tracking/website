import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import Header from './header'
import Footer from './footer'
import SEO from './seo'
import Container from '../common/container'
import SkipNavigation from '../common/skip-navigation'
import '../../scss/global.scss'

const Layout = ({ title, children, navigation, noMargin, hasHero }) => {
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
      <SEO title={title} />
      <SkipNavigation />
      <Header
        siteTitle={data.site.siteMetadata.title}
        title={title}
        navigation={navigation}
        noMargin={noMargin}
        hasHero={hasHero}
      />
      <main id="main">
        <SkipNavContent />
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
