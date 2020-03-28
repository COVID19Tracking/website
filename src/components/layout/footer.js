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
          <a href="https://github.com/">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/{{ data.twitter }}">Twitter</a>
        </li>
      </ul>
    </Container>
  </footer>
)

export default Footer
