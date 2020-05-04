import React from 'react'
import PressLogos from './press-logos'
import InThePress from './in-the-press'
import ExploreLink from './explore-link'
import pressStyles from './press.module.scss'

export default () => (
  <section className={pressStyles.section}>
    <div className={pressStyles.list}>
      <h3>Who&apos;s using our data</h3>
      <InThePress />
    </div>
    <div className={pressStyles.logos}>
      <PressLogos onlyFeatured />
    </div>
    <ExploreLink
      to="about-project/in-the-press"
      text="See what else our data powers"
    />
  </section>
)
