import React from 'react'
import PressLogos from './press-logos'
import InThePress from './in-the-press'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import pressStyles from './press.module.scss'

export default () => (
  <section>
    <h3 className={pressStyles.header}>Who&#8217;s using our data</h3>
    <div className={pressStyles.press}>
      <div className={pressStyles.list}>
        <InThePress />
      </div>
      <div className={pressStyles.logos}>
        <PressLogos onlyFeatured />
      </div>
      <CtaLink to="/about-project/in-the-press" centered>
        See what else our data powers
      </CtaLink>
    </div>
  </section>
)
