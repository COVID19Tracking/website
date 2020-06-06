import React from 'react'
import multiplierHighlightStyle from './multiplier-highlight.module.scss'

function range(multiplier) {
  if (multiplier >= 136 && multiplier <= 149) {
    return 'nearly 1.5 times'
  }
  if (multiplier > 149 && multiplier < 151) {
    return '1.5 times'
  }
  if (multiplier >= 151 && multiplier <= 185) {
    return 'more than 1.5 times'
  }
  if (multiplier > 185 && multiplier <= 199) {
    return 'nearly 2 times'
  }
  if (multiplier > 199 && multiplier < 201) {
    return '2 times'
  }
  if (multiplier >= 201 && multiplier <= 235) {
    return 'more than 2 times'
  }
  if (multiplier > 236 && multiplier <= 249) {
    return 'nearly 2.5 times'
  }
  if (multiplier > 249 && multiplier < 251) {
    return '2.5 times'
  }
  if (multiplier >= 251 && multiplier <= 285) {
    return 'more than 2.5 times'
  }
  if (multiplier > 285 && multiplier <= 299) {
    return 'nearly 3 times'
  }
  if (multiplier > 299 && multiplier < 301) {
    return '3 times'
  }
  if (multiplier >= 301 && multiplier <= 335) {
    return 'more than 3 times'
  }
  return 'much'
}

export default ({ multiplier }) => (
  <div className={multiplierHighlightStyle.highlight}>
    <p>
      This means Black people are dying at a rate{' '}
      <span className={multiplierHighlightStyle.number}>
        {range(Math.round(multiplier * 100))} higher
      </span>{' '}
      than their population share.
    </p>
  </div>
)
