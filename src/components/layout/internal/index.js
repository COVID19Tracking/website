import React from 'react'
import { Link } from 'gatsby'
import Container from '~components/common/container'
import projectLogo from '~images/project-logo.svg'
import layoutStyles from './internal-layout.module.scss'

export default ({ title, children }) => (
  <>
    <header className={layoutStyles.header}>
      <Container>
        <div className={layoutStyles.container}>
          <Link to="/" className={layoutStyles.logo}>
            <img src={projectLogo} alt="The COVID Tracking Project" />
          </Link>
          <h1>
            <Link to="/internal">Internal site</Link> {title && <>- {title}</>}
          </h1>
        </div>
      </Container>
    </header>
    <Container>{children}</Container>
  </>
)
