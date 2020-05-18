import React from 'react'
import tableSymbolsStyles from './table-symbols.module.scss'

const NoteSymbol = ({ index, title, linkTo, inkey = false }) => {
  if (linkTo) {
    return (
      <a
        href={`#${linkTo}`}
        className={`${tableSymbolsStyles.noteSymbol} ${
          inkey ? tableSymbolsStyles.inKey : ''
        }`}
      >
        <span className="a11y-only">{title}</span>
        <span>{index}</span>
      </a>
    )
  }
  return (
    <div
      className={`${tableSymbolsStyles.noteSymbol} ${
        inkey ? tableSymbolsStyles.inKey : ''
      }`}
    >
      <span className="a11y-only">{title}</span>
      <span>{index}</span>
    </div>
  )
}

const DisparitySymbol = ({ inkey = false }) => (
  <div
    className={`${tableSymbolsStyles.disparitySymbol} ${
      inkey ? tableSymbolsStyles.inKey : ''
    }`}
  >
    <span className="a11y-only">
      Figure is significantly higher than population proportion
    </span>
    <div className={tableSymbolsStyles.inner} />
  </div>
)

export { NoteSymbol, DisparitySymbol }
