import React from 'react'
import heroTextStyle from './hero-text.module.scss'

const HeroText = ({ children }) => (
  <p className={heroTextStyle.text}>{children}</p>
)

export default HeroText
