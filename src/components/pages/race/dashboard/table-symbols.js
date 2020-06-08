import React from 'react'
import tableSymbolsStyles from './table-symbols.module.scss'

const Notes = ({ index, title, linkTo }) => {
  if (!linkTo || !title) {
    return null
  }
  return (
    <sup className={tableSymbolsStyles.note}>
      <a href={`#${linkTo}`}>
        <span className="a11y-only">{title}</span>
        <span>{index}</span>
      </a>
    </sup>
  )
}

const CautionSymbol = ({ inkey = false }) => (
  <span
    className={`${tableSymbolsStyles.caution} ${
      inkey ? tableSymbolsStyles.inKey : ''
    }`}
  >
    <span className="a11y-only">This data is not reliable</span>
  </span>
)

const DisparitySymbol = ({ inkey = false }) => (
  <span
    className={`${tableSymbolsStyles.disparitySymbol} ${
      inkey ? tableSymbolsStyles.inKey : ''
    }`}
  >
    <span className="a11y-only">
      Figure is significantly higher than population proportion
    </span>
    <span className={tableSymbolsStyles.inner} />
  </span>
)

export { Notes, CautionSymbol, DisparitySymbol }
