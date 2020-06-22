import React from 'react'
import Container from '~components/common/landing-page/container'
import HeroHeader from '~components/common/landing-page/hero/header'
import heroStyle from './header-hero.module.scss'

export default () => {
  return (
    <div className={`hero ${heroStyle.hero}`}>
      <Container>
        <HeroHeader>
          The public deserves the most complete data available about COVID-19 in
          the{' '}
          <abbr title="United States" aria-label="United States">
            US
          </abbr>
          . No official source is providing it,{' '}
          <span className="nowrap">so we are</span>.
        </HeroHeader>
      </Container>
    </div>
  )
}
