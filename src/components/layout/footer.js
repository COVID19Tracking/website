import React from 'react'
import Container from '../common/container'
import logo from '../../images/project-logo.svg'
import '../../scss/components/footer.scss'

const Footer = () => (
  <footer>
    <Container>
      <img src={logo} alt="The COVID Tracking Project" />
      <ul>
        <li>
          <a href="https://github.com/COVID19Tracking">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/COVID19Tracking">Twitter</a>
        </li>
        <li>
          <a href="#reach-skip-nav" className="footer-return-top">
            Back to top
          </a>
        </li>
      </ul>
    </Container>
  </footer>
)

export default Footer
