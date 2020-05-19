import React from 'react'
import Container from '~components/common/container'
import multiplierHighlightStyle from './multiplier-highlight.module.scss'

export default ({ multiplier }) => (
  <div className={multiplierHighlightStyle.highlight}>
    <Container>
      <p>
        That&apos;s a black death rate{' '}
        <span className={multiplierHighlightStyle.number}>
          {Math.round(multiplier * 100) / 100}x higher
        </span>{' '}
        than the Black share of the population.
      </p>
    </Container>
  </div>
)
