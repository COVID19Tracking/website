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
  returnLinks,
  description,
  children,
  noMargin,
  hasHero,
  centered,
  socialCard,
  hero,
  centerTitle,
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
      <SEO title={title} description={description} socialCard={socialCard} />
      <SkipNavigation />
      <Header
        siteTitle={data.site.siteMetadata.title}
        title={displayTitle || title}
        titleLink={titleLink}
        path={path}
        noMargin={noMargin}
        hasHero={hasHero}
        returnLinks={returnLinks}
        hero={hero}
        centerTitle={centerTitle}
      />
      <main id="main">
        <SkipNavContent />
        <Container centered={centered}>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
