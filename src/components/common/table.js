/* eslint-disable jsx-a11y/aria-role */

import React from 'react'
import DetailText from './detail-text'
import tableStyle from './table.module.scss'

const Th = ({ children, alignLeft, colSpan, header, showHeader }) => (
  <th
    scope="col"
    colSpan={colSpan}
    className={alignLeft && tableStyle.alignLeft}
  >
    <span role="text">
      {children}
      {header && (
        <span
          className={
            showHeader ? tableStyle.headerLabel : tableStyle.headerLabelHidden
          }
        >
          {header}
        </span>
      )}
    </span>
  </th>
)

const Td = ({ children, alignLeft }) => (
  <td className={alignLeft && tableStyle.alignLeft}>{children}</td>
)

const Table = ({ children, tableLabel }) => (
  <div>
    <table className={tableStyle.table}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export { Th, Td, Table }
