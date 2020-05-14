import React from 'react'
import heroStyle from './header-hero.module.scss'
import containerStyle from '~components/common/container.module.scss'
import homepageContainerStyle from './container.module.scss'

export default () => {
  return (
    <div className={`hero ${heroStyle.hero}`}>
      <div className={`${containerStyle.container} ${heroStyle.container}`}>
        <div
          className={`${homepageContainerStyle.container} ${homepageContainerStyle.header}`}
        >
          <h2 className={`hero-header ${heroStyle.header}`}>
            The public deserves the most complete data available about COVID-19
            in the{' '}
            <abbr title="United States" aria-label="United States">
              US
            </abbr>
            . No official source is providing it,{' '}
            <span className="nowrap">so we are</span>.
          </h2>
        </div>
      </div>
    </div>
  )
}
