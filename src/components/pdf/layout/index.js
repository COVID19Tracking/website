import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import Container from '~components/common/container'
import '~scss/global.scss'

const Layout = ({
  title,
  displayTitle,
  children,
  centered,
  hero,
  flipColors = false,
  noContainer = false,
}) => {
  return (
    <>
      <Header
        siteTitle="The COVID Tracking Project"
        title={displayTitle || title}
        hero={hero}
      />
      <main id="main">
        {noContainer ? (
          <>{children}</>
        ) : (
          <Container centered={centered}>{children}</Container>
        )}
      </main>
      <Footer flipColors={flipColors} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
