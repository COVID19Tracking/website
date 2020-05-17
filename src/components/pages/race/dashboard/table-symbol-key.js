import React from 'react'
import { NoteSymbol, DisparitySymbol } from './table-symbols'
import tableSymbolStyles from './table-symbol-key.module.scss'

export default () => (
  <div className={tableSymbolStyles.container}>
    <p>
      <NoteSymbol inkey />
      Figure should not be compared to population proportion due to high
      unknowns
    </p>
    <p>
      <DisparitySymbol inkey />
      Figure is significantly higher than population proportion
    </p>
  </div>
)
