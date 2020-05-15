import React from 'react'
import Container from '~components/common/container'
import headerHeroStyle from './header-hero.module.scss'
import HeroHeader from '~components/common/landing-page/hero/header'
import HeroText from '~components/common/landing-page/hero/text'

export default () => (
  <div className={headerHeroStyle.hero}>
    <Container>
      <HeroHeader>
        COVID-19 is affecting people of color the most. We’re tracking the data
        in real time.
      </HeroHeader>
      <HeroText>
        The COVID Racial Data Tracker is a collaboration between the COVID
        Tracking Project and the Antiracist Research &amp; Policy Center.
        Together, we&apos;re gathering the most complete race and ethnicity data
        on COVID-19 in the US anywhere.
      </HeroText>
    </Container>
  </div>
)
