import React from 'react'
import TableSymbolKey from './table-symbol-key'
import tableTitleStyles from './table-title.module.scss'

export default ({ titleText }) => (
  <div className={tableTitleStyles.container}>
    <h3>{titleText}</h3>
    <TableSymbolKey />
  </div>
)
