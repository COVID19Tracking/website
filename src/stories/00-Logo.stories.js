import React from 'react'
import logoWhite from '../images/project-logo.svg'
import logoBlack from '../images/project-logo-black.svg'
import iconImage from '../images/icon.png'

export default {
  title: 'Logo ',
}

export const whiteWithText = () => (
  <div style={{ padding: '3rem', background: 'black' }}>
    <img src={logoWhite} alt="White logo" />
  </div>
)

export const blackWithText = () => (
  <div style={{ padding: '3rem', background: 'white' }}>
    <img src={logoBlack} alt="Black logo" />
  </div>
)

export const icon = () => (
  <div style={{ padding: '3rem', background: 'white' }}>
    <img src={iconImage} alt="icon logo" />
  </div>
)
