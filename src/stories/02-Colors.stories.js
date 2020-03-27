import React from 'react'
import colors from '../scss/colors.scss'

export default {
  title: 'Colors',
}

export const textColors = () => (
  <>
    <p style={{ color: colors.text }}>This is regular text</p>
    <p style={{ color: colors.link }}>This is link text</p>
    <p style={{ color: colors.linkActive }}>This is active link text</p>
  </>
)
