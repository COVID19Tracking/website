import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Container from '~components/common/container'
import DevelopmentWarning from '~components/layout/header/development-warning'
import projectLogo from '~images/project-logo.svg'
import layoutStyles from './internal-layout.module.scss'

export default ({ title, children }) => (
  <>
    <Helmet title="Internal" />
    <DevelopmentWarning />
    <header className={layoutStyles.header}>
      <Container>
        <div className={layoutStyles.container}>
          <Link to="/" className={layoutStyles.logo}>
            <img src={projectLogo} alt="The COVID Tracking Project" />
          </Link>
          <h1>
            <Link to="/internal">Internal</Link> {title && <>- {title}</>}
          </h1>
        </div>
      </Container>
    </header>
    <Container>{children}</Container>
  </>
)
