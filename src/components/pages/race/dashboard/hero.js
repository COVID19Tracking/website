import React from 'react'
import HeroStyles from './hero.module.scss'

export default ({ ledeContent }) => (
  <div className={HeroStyles.container}>
    <h1>
      Here's the latest race and ethnicity data from every state and territory
      that reports it.
    </h1>
    <div
      dangerouslySetInnerHTML={{
        __html: ledeContent,
      }}
    />
  </div>
)
