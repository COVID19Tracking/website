import React from 'react'
import contrast from 'get-contrast'
import colors from '~scss/colors.module.scss'

const ColorSwatch = ({ colorList, names }) => (
  <>
    <div>
      {names.map(name => (
        <div
          key={`color-name-${name}`}
          style={{
            width: '150px',
            display: 'inline-block',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <code>{name}</code>
        </div>
      ))}
    </div>
    <div>
      {colorList.map(color => (
        <div
          key={`color-swatch-${color}`}
          style={{
            width: '150px',
            display: 'inline-block',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <code>{color}</code>
        </div>
      ))}
    </div>
    <div>
      {colorList.map(color => (
        <div
          key={color}
          style={{
            background: color,
            width: '150px',
            height: '150px',
            display: 'inline-block',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <p
            style={{
              color: '#fff',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
            }}
          >
            {contrast.score(color, '#ffffff')}
          </p>
          <p style={{ color: '#000', marginBottom: 0, fontWeight: 'bold' }}>
            {contrast.score(color, '#000000')}
          </p>
        </div>
      ))}
      <div>
        {colorList.map(color => (
          <div
            key={`color-${color}`}
            style={{
              width: '150px',
              display: 'inline-block',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            <p style={{ color }}>Sample text</p>
            <p style={{ color, fontWeight: 'bold' }}>Bold text</p>
          </div>
        ))}
      </div>
    </div>
  </>
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

export const colorsPlum = () => (
  <ColorSwatch
    colorList={[
      colors.colorPlum100,
      colors.colorPlum200,
      colors.colorPlum300,
      colors.colorPlum400,
      colors.colorPlum500,
      colors.colorPlum600,
      colors.colorPlum700,
      colors.colorPlum800,
    ]}
    names={[
      '$color-plum-100',
      '$color-plum-200',
      '$color-plum-300',
      '$color-plum-400',
      '$color-plum-500',
      '$color-plum-600',
      '$color-plum-700',
      '$color-plum-800',
    ]}
  />
)

export const colorsHoney = () => (
  <ColorSwatch
    colorList={[
      colors.colorHoney100,
      colors.colorHoney200,
      colors.colorHoney300,
      colors.colorHoney400,
      colors.colorHoney500,
      colors.colorHoney600,
      colors.colorHoney700,
      colors.colorHoney800,
    ]}
    names={[
      '$color-honey-100',
      '$color-honey-200',
      '$color-honey-300',
      '$color-honey-400',
      '$color-honey-500',
      '$color-honey-600',
      '$color-honey-700',
      '$color-honey-800',
    ]}
  />
)

export const colorsBlueberry = () => (
  <ColorSwatch
    colorList={[
      colors.colorBlueberry100,
      colors.colorBlueberry200,
      colors.colorBlueberry300,
      colors.colorBlueberry400,
      colors.colorBlueberry500,
    ]}
    names={[
      '$color-blueberry-100',
      '$color-blueberry-200',
      '$color-blueberry-300',
      '$color-blueberry-400',
      '$color-blueberry-500',
    ]}
  />
)

export const colorsSlate = () => (
  <ColorSwatch
    colorList={[
      colors.colorSlate100,
      colors.colorSlate200,
      colors.colorSlate300,
      colors.colorSlate400,
      colors.colorSlate500,
      colors.colorSlate600,
      colors.colorSlate700,
      colors.colorSlate800,
    ]}
    names={[
      '$color-slate-100',
      '$color-slate-200',
      '$color-slate-300',
      '$color-slate-400',
      '$color-slate-500',
      '$color-slate-600',
      '$color-slate-700',
      '$color-slate-800',
    ]}
  />
)
