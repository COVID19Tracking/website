import React from 'react'
import HeroStyles from './hero.module.scss'

export default ({ ledeContent }) => (
  <div className={HeroStyles.container}>
    <h1>
      The latest race and ethnicity data from every state and territory that
      reports it.
    </h1>
    <p
      dangerouslySetInnerHTML={{
        __html: ledeContent,
      }}
    />
  </div>
)
