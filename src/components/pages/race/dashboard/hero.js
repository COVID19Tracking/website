import React from 'react'
import smartypants from 'smartypants'
import HeroStyles from './hero.module.scss'

export default ({ ledeContent }) => (
  <div className={HeroStyles.container}>
    <h1>
      Here&#8217;s the latest race and ethnicity data from every state and
      territory that reports it.
    </h1>
    <div
      dangerouslySetInnerHTML={{
        __html: smartypants(ledeContent),
      }}
    />
  </div>
)
