/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
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
  tableData.shift() // remove the header
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

const TableContentBlock = ({ table }) => {
  const { headers, rows } = parseMarkdownTable(table)
  return (
    <table className={tableStyle.table}>
      <thead>
        <tr className={tableStyle.header}>
          {headers.map(item => (
            <th
              key={`header-${item}`}
              dangerouslySetInnerHTML={{ __html: item }}
            />
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

export default TableContentBlock
