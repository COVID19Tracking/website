import React from 'react'
import { Link } from 'gatsby'
import footerStyles from './footer.module.scss'

import ctpLogo from '~images/project-logo.svg'
import githubLogo from '~images/footer/github-logo.svg'
import twitterLogo from '~images/footer/twitter-logo.svg'
import upArrow from '~images/footer/up-arrow.svg'

const Footer = () => (
  <footer className={footerStyles.wrapper}>
    <div className={footerStyles.footer}>
      <div className={footerStyles.main}>
        <Link to="/" className={footerStyles.ctpLogo}>
          <img
            src={ctpLogo}
            alt="The COVID Tracking Project"
            className={footerStyles.projectLogo}
          />
        </Link>
        <div className={footerStyles.links}>
          <ul className={footerStyles.footerList}>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/license">License</Link>
            </li>
            <li>
              <a href="https://www.theatlantic.com/privacy-policy/">
                Privacy Policy
              </a>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </div>
        <ul className={footerStyles.social}>
          <li>
            <a href="https://github.com/COVID19Tracking">
              <img src={githubLogo} alt="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/COVID19Tracking">
              <img src={twitterLogo} alt="Twitter" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr className={footerStyles.divider} />
    <div className={footerStyles.copyright}>
      <span>
        CovidTracking.com Copyright &copy; {new Date().getFullYear()} by The
        Atlantic Monthly Group. <Link to="/license">(CC BY-NC 4.0)</Link>
      </span>
      <a href="#reach-skip-nav" className={footerStyles.backToTop}>
        <span>Back to top</span>
        <img src={upArrow} alt="Back to top" />
      </a>
    </div>
  </footer>
)

export default Footer
