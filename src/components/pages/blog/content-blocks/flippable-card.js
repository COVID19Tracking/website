import React from 'react'
import cardStyles from './flippable-card.module.scss'

const FlippableCard = ({ front, back }) => (
  <div className={cardStyles.card}>
    <img src={front.fixed.src} aria-hidden alt="" />
    <img src={back.fixed.src} aria-hidden alt="" />
  </div>
)

export default FlippableCard
