import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'
import SkipNavigation from '../common/skip-navigation'
import { SkipNavContent } from '@reach/skip-nav'
import '../../scss/global.scss'
const Layout = ({ children }) => {
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
        <div className="body container">{children}</div>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
