/* eslint-disable react/no-array-index-key,jsx-a11y/control-has-associated-label */
import React from 'react'
import marked from 'marked'
import tableStyle from './table-content-block.module.scss'

const renderCell = cell =>
  marked(cell)
    .replace(/<(\/)?p>/g, '')
    .trim()

const parseMarkdownTable = table => {
  const rows = []
  // break the table into an array of rows and headers
  const tableData = table.split(/\n/).map(row => row.replace(/^\|+|\|+$/g, ''))
  const headers = tableData[0]
    .split('|')
    .map(item => renderCell(item.trim().replace(/_/g, '')))
  tableData.shift()
  tableData.forEach(row => {
    const rowData = row.split('|')
    let isDivider = true
    rowData.forEach(item => {
      if (item.search(/[^-]/) > -1) {
        isDivider = false
      }
    })
    if (isDivider) {
      return
    }
    rows.push(rowData.map(item => renderCell(item)))
  })
  return {
    headers,
    rows,
  }
}

export default ({ table }) => {
  const { headers, rows } = parseMarkdownTable(table)
  return (
    <table className={tableStyle.table}>
      <thead>
        <tr className={tableStyle.header}>
          {headers.map(item => (
            <th key={`header-${item}`}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`row-${index}`} className={tableStyle.row}>
            {row.map((item, itemIndex) => (
              <td key={`row-${index}-${item}`} alignLeft>
                <span
                  className={tableStyle.cellLabel}
                  dangerouslySetInnerHTML={{ __html: headers[itemIndex] }}
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
