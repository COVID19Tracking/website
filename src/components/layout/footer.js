import React from 'react'
import Container from '../common/container'
import logo from '../../images/project-logo.svg'
import footerStyles from './footer.module.scss'

const Footer = () => (
  <footer className={footerStyles.footer}>
    <Container>
      <div className={footerStyles.container}>
        <img src={logo} alt="The COVID Tracking Project" />
        <ul>
          <li>
            <a href="https://github.com/COVID19Tracking">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/COVID19Tracking">Twitter</a>
          </li>
          <li>
            <a href="#reach-skip-nav" className={footerStyles.backToTop}>
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </Container>
  </footer>
)

export default Footer
