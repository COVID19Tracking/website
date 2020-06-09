/* eslint-disable react/no-array-index-key,jsx-a11y/control-has-associated-label */
import React from 'react'
import marked from 'marked'
import { Table, Th, Td } from '~components/common/table'
import tableStyle from './table-content-block.module.scss'

const renderCell = cell =>
  marked(cell)
    .replace(/<(\/)?p>/g, '')
    .trim()

const parseMarkdownTable = table => {
  const rows = []
  const tableData = table.split(/\n/)
  const headers = tableData[0]
    .split('|')
    .map(item => renderCell(item.trim().replace(/_/g, '')))
  tableData.shift()
  tableData.forEach(row => {
    const rowData = row.split('|')
    let isDivider = true
    rowData.forEach(item => {
      console.log(item)
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
    <Table>
      <thead>
        <tr className={tableStyle.header}>
          {headers.map(item => (
            <Th key={`header-${item}`}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`row-${index}`} className={tableStyle.row}>
            {row.map((item, itemIndex) => (
              <Td key={`row-${index}-${item}`} alignLeft>
                <span
                  className={tableStyle.cellLabel}
                  dangerouslySetInnerHTML={{ __html: headers[itemIndex] }}
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
