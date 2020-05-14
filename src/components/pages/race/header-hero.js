import React from 'react'
import { Link } from 'gatsby'
import LandingPageContainer from '~components/common/landing-page/container'
import headerHeroStyle from './header-hero.module.scss'
import HeroHeader from '~components/common/landing-page/hero/header'
import HeroText from '~components/common/landing-page/hero/text'

export default () => (
  <div className={headerHeroStyle.hero}>
    <LandingPageContainer>
      <div className={headerHeroStyle.navigation}>
        <h1>The COVID Racial Data Tracker</h1>
        <nav aria-label="COVID Racial Data Tracker navigation">
          <ul>
            <li>
              <Link to="/race/about">About</Link>
            </li>
            <li>
              <Link to="/race/dashboard">Racial Data Dashboard</Link>
            </li>
            <li>
              <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTfUQPxkhP_CRcGmnnpUBihnTNZ9Z8pcizII4_sc2o2n3opOoAJdAM4CRTJBI339tou8LWnQrqbTMgH/pub?gid=902690690&single=true&output=csv">
                Complete Dataset (CSV)
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={headerHeroStyle.chartWrapper}>
        <div className={headerHeroStyle.content}>
          <HeroHeader>
            COVID-19 affecting people of color the most. We’re tracking the data
            in realtime.
          </HeroHeader>
          <HeroText>
            Black people make up just 13% of the US population—but account for
            30% of all deaths where race is known. That&apos;s at least 13,297
            Black lives lost so far—2.3 times as many as expected for a
            population this size.
          </HeroText>
        </div>
        <div className={headerHeroStyle.chart}>
          <div style={{ height: '400px', background: 'white' }} />
        </div>
      </div>
    </LandingPageContainer>
  </div>
)
