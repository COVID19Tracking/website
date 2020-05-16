import React from 'react'
import tableSymbolsStyles from './table-symbols.module.scss'

const NoteSymbol = ({ index, title }) => (
  <div className={tableSymbolsStyles.noteSymbolContainer} title={title}>
    <span>{index}</span>
  </div>
)

const GreaterThanSymbol = () => (
  <div>
    <span>above pop pct</span>
  </div>
)

export { NoteSymbol, GreaterThanSymbol }
