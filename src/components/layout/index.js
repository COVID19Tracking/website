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

const Layout = ({ title, children, noContainer }) => {
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
      <Header siteTitle={data.site.siteMetadata.title} />
      <main id="main">
        <SkipNavContent />
        {noContainer ? (
          <div className="body">{children}</div>
        ) : (
          <Container>
            {title && <h1>{title}</h1>}
            <div className="body">{children}</div>
          </Container>
        )}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
