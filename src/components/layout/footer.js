import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import footerStyles from './footer.module.scss'

import ctpLogo from '~images/project-logo.svg'
import githubLogo from '~images/footer/github-logo.svg'
import twitterLogo from '~images/footer/twitter-logo.svg'
import instagramLogo from '~images/footer/instagram-logo.svg'
import upArrow from '~images/footer/up-arrow.svg'

import githubLogoPlum from '~images/footer/github-logo-plum.svg'
import twitterLogoPlum from '~images/footer/twitter-logo-plum.svg'
import instagramLogoPlum from '~images/footer/instagram-logo-plum.svg'
import upArrowPlum from '~images/footer/up-arrow-plum.svg'

import ctpLogoPlum from '~images/project-logo-plum.svg'

const Footer = ({
  noMargin = false,
  hideAbout = false,
  flipColors = false,
}) => (
  <footer
    className={classnames(
      footerStyles.wrapper,
      noMargin && footerStyles.noMargin,
      flipColors && footerStyles.flipColors,
    )}
  >
    <div className={footerStyles.footer}>
      <div className={footerStyles.main}>
        <Link to="/" className={footerStyles.ctpLogo}>
          <img
            src={flipColors ? ctpLogoPlum : ctpLogo}
            alt="The COVID Tracking Project"
            className={footerStyles.projectLogo}
          />
        </Link>
        <div className={footerStyles.links}>
          <ul>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/about-data/license">License</Link>
            </li>
            <li>
              <a href="https://www.theatlantic.com/privacy-policy/">
                Privacy Policy
              </a>
            </li>
            <li>
              <Link to="/about/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link to="/about/sitemap">Sitemap</Link>
            </li>
            <li>
              <a href="/rss.xml">RSS</a>
            </li>
          </ul>
        </div>
        <ul className={footerStyles.social}>
          <li>
            <a href="https://github.com/COVID19Tracking">
              <img
                src={flipColors ? githubLogoPlum : githubLogo}
                alt="GitHub"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/COVID19Tracking">
              <img
                src={flipColors ? twitterLogoPlum : twitterLogo}
                alt="Twitter"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/covidtrackingproject/">
              <img
                src={flipColors ? instagramLogoPlum : instagramLogo}
                alt="Instagram"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr className={footerStyles.divider} />
    <div className={footerStyles.copyright}>
      {!hideAbout && (
        <p>
          The COVID Tracking Project collects and publishes the most complete
          data about COVID-19 in the US.
        </p>
      )}
      <span>
        covidtracking.com Copyright &copy; {new Date().getFullYear()} by The
        Atlantic Monthly Group. <Link to="/license">(CC BY 4.0)</Link>
      </span>
      <a href="#reach-skip-nav" className={footerStyles.backToTop}>
        <span>Back to top</span>
        <img src={flipColors ? upArrowPlum : upArrow} alt="" aria-hidden />
      </a>
    </div>
  </footer>
)

export default Footer
