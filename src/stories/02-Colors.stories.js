import React from 'react'
import colors from '../scss/colors.scss'
import contrast from 'get-contrast'

const ColorSwatch = ({ colors }) => (
  <div>
    {colors.map(color => (
      <div
        key={color}
        style={{
          background: color,
          width: '100px',
          height: '100px',
          display: 'inline-block',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        <p
          style={{ color: '#fff', marginBottom: '0.5rem', fontWeight: 'bold' }}
        >
          {contrast.score(color, '#ffffff')}
        </p>
        <p style={{ color: '#000', marginBottom: 0, fontWeight: 'bold' }}>
          {contrast.score(color, '#000000')}
        </p>
      </div>
    ))}
  </div>
)

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

export const mainColors = () => (
  <ColorSwatch
    colors={[
      colors.mainDarkest,
      colors.mainDark,
      colors.mainMid,
      colors.mainLight,
      colors.mainLightest,
    ]}
  />
)

export const secondaryColors = () => (
  <ColorSwatch
    colors={[
      colors.secondaryDarkest,
      colors.secondaryDark,
      colors.secondaryMid,
      colors.secondaryLight,
      colors.secondaryLightest,
    ]}
  />
)

export const mutedColors = () => <ColorSwatch colors={[colors.mutedMid]} />

export const greys = () => (
  <ColorSwatch
    colors={[
      colors.grey1,
      colors.grey2,
      colors.grey3,
      colors.grey4,
      colors.grey5,
      colors.grey6,
      colors.grey7,
      colors.grey8,
      colors.grey9,
      colors.grey10,
    ]}
  />
)
