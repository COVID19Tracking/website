import React from 'react'
import tableSymbolsStyles from './table-symbols.module.scss'

const NoteSymbol = ({ index, title }) => (
  <div className={tableSymbolsStyles.noteSymbol} title={title}>
    <span>{index}</span>
  </div>
)

const DisparitySymbol = () => (
  <div className={tableSymbolsStyles.disparitySymbol}>
    <div className={tableSymbolsStyles.inner} />
  </div>
)

export { NoteSymbol, DisparitySymbol }
