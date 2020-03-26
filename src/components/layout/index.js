import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import Header from './header'
import Footer from './footer'
import Container from '../common/container'
import SkipNavigation from '../common/skip-navigation'
import '../../scss/global.scss'

const Layout = ({ children, noContainer }) => {
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
      <SkipNavigation />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main id="main">
        <SkipNavContent />
        {noContainer ? (
          <div className="body">{children}</div>
        ) : (
          <Container>
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
