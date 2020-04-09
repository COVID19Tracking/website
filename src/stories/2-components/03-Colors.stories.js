import React from 'react'
import colors from '../../scss/colors.scss'
import contrast from 'get-contrast'

const ColorSwatch = ({ colors, names }) => (
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
      {colors.map(color => (
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
      {colors.map(color => (
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
        {colors.map(color => (
          <div
            key={`color-${color}`}
            style={{
              width: '150px',
              display: 'inline-block',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            <p style={{ color: color }}>Sample text</p>
            <p style={{ color: color, fontWeight: 'bold' }}>Bold text</p>
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
    colors={[
      colors.colorPlum01,
      colors.colorPlum02,
      colors.colorPlum03,
      colors.colorPlum04,
      colors.colorPlum05,
      colors.colorPlum06,
      colors.colorPlum07,
      colors.colorPlum08,
    ]}
    names={[
      '$color-plum-1',
      '$color-plum-2',
      '$color-plum-3',
      '$color-plum-4',
      '$color-plum-5',
      '$color-plum-6',
      '$color-plum-7',
      '$color-plum-8',
    ]}
  />
)

export const colorsHoney = () => (
  <ColorSwatch
    colors={[
      colors.colorHoney01,
      colors.colorHoney02,
      colors.colorHoney03,
      colors.colorHoney04,
      colors.colorHoney05,
      colors.colorHoney06,
      colors.colorHoney07,
      colors.colorHoney08,
    ]}
    names={[
      '$color-honey-1',
      '$color-honey-2',
      '$color-honey-3',
      '$color-honey-4',
      '$color-honey-5',
      '$color-honey-6',
      '$color-honey-7',
      '$color-honey-8',
    ]}
  />
)

export const colorsBlueberry = () => (
  <ColorSwatch
    colors={[
      colors.colorBlueberry01,
      colors.colorBlueberry02,
      colors.colorBlueberry03,
      colors.colorBlueberry04,
      colors.colorBlueberry05,
    ]}
    names={[
      '$color-blueberry-1',
      '$color-blueberry-2',
      '$color-blueberry-3',
      '$color-blueberry-4',
      '$color-blueberry-5',
    ]}
  />
)

export const colorsSlate = () => (
  <ColorSwatch
    colors={[
      colors.colorSlate01,
      colors.colorSlate02,
      colors.colorSlate03,
      colors.colorSlate04,
      colors.colorSlate05,
      colors.colorSlate06,
      colors.colorSlate07,
      colors.colorSlate08,
      colors.colorSlate09,
      colors.colorSlate10,
    ]}
    names={[
      '$color-slate-1',
      '$color-slate-2',
      '$color-slate-3',
      '$color-slate-4',
      '$color-slate-5',
      '$color-slate-6',
      '$color-slate-7',
      '$color-slate-8',
      '$color-slate-9',
      '$color-slate-10',
    ]}
  />
)
