import React from 'react'
import { Row, Col } from '~components/common/grid'
import PressLogos from './press-logos'
import InThePress from './in-the-press'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import pressStyles from './press.module.scss'

export default () => (
  <section className={pressStyles.section}>
    <h3 className={pressStyles.header}>Who&#8217;s using our data</h3>
    <div className={pressStyles.press}>
      <Row>
        <Col
          width={[4, 6, 6]}
          paddingRight={[8, 8, 64]}
          paddingBottom={[32, 32, 0]}
        >
          <InThePress />
        </Col>
        <Col width={[4, 6, 6]} paddingLeft={[0, 0, 0]}>
          <PressLogos onlyFeatured />
        </Col>
      </Row>
      <CtaLink to="/about/press" centered>
        See what else our data powers
      </CtaLink>
    </div>
  </section>
)
