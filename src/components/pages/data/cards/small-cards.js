import React from 'react'
import smallCardsStyles from './small-cards.module.scss'

const SmallCards = ({ children }) => (
  <div className={smallCardsStyles.container}>{children}</div>
)

export default SmallCards
