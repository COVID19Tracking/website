import React from 'react'
import PressLogos from './press-logos'
import InThePress from './in-the-press'
import CtaLink from './cta-link'
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
    <CtaLink to="about-project/in-the-press">
      See what else our data powers
    </CtaLink>
  </section>
)
