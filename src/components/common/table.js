import React from 'react'
import DetailText from './detail-text'
import tableStyle from './table.module.scss'

const Th = ({ children, alignLeft, scope, colSpan }) => (
  <th
    scope={scope}
    colSpan={colSpan}
    className={alignLeft ? tableStyle.alignLeft : ''}
  >
    {children}
  </th>
)

const Td = ({ children, alignLeft }) => (
  <td className={alignLeft ? tableStyle.alignLeft : ''}>{children}</td>
)

const Table = ({ children, tableLabel }) => (
  <div>
    <table className={tableStyle.table}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export { Th, Td, Table }
