import React from 'react'
import TableSymbolKey from '~components/pages/race/dashboard/table-symbol-key'

export default ({ titleText, state }) => (
  <div>
    <h3>{titleText}</h3>
    <TableSymbolKey state={state} />
  </div>
)
