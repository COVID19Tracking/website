import React from 'react'
import tableSymbolsStyles from './table-symbols.module.scss'

const Notes = ({ index, title, linkTo }) => {
  if (!linkTo) {
    return null
  }
  return (
    <a href={`#${linkTo}`} className={tableSymbolsStyles.note}>
      <span className="a11y-only">{title}</span>
      <span>{index}</span>
    </a>
  )
}

const CautionSymbol = () => (
  <span className={tableSymbolsStyles.caution}>
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
    <div className={tableSymbolsStyles.inner} />
  </span>
)

export { Notes, CautionSymbol, DisparitySymbol }
