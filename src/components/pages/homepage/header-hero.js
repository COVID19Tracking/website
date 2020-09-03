import React from 'react'
import Container from '~components/common/landing-page/container'
import heroStyle from './header-hero.module.scss'

const HomepageHeaderHero = () => {
  return (
    <div className={`hero ${heroStyle.hero}`}>
      <Container>
        <h2>
          The public deserves the most complete data available about{' '}
          <span className="nowrap">COVID-19</span> in the{' '}
          <abbr title="United States" aria-label="United States">
            US
          </abbr>
          . No official source is providing it,{' '}
          <span className="nowrap">so we are</span>.
        </h2>
      </Container>
    </div>
  )
}

export default HomepageHeaderHero
