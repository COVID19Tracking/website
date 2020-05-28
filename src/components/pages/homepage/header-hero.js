import React from 'react'
import heroStyle from '~components/pages/homepage/header-hero.module.scss'
import HeroHeader from '~components/common/landing-page/hero/header'
import containerStyle from '~components/common/container.module.scss'
import homepageContainerStyle from '~components/common/landing-page/container.module.scss'

export default () => {
  return (
    <div className={`hero ${heroStyle.hero}`}>
      <div className={`${containerStyle.container} ${heroStyle.container}`}>
        <div
          className={`${homepageContainerStyle.container} ${homepageContainerStyle.header}`}
        >
          <HeroHeader>
            The public deserves the most complete data available about COVID-19
            in the{' '}
            <abbr title="United States" aria-label="United States">
              US
            </abbr>
            . No official source is providing it,{' '}
            <span className="nowrap">so we are</span>.
          </HeroHeader>
        </div>
      </div>
    </div>
  )
}
