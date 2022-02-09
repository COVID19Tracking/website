/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import marked from 'marked'
import ImageCredit from '~components/common/image-credit'
import tableStyle from './table-content-block.module.scss'
import classNames from 'classnames'

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

const TableContentBlock = ({ table, caption }) => {
  const { headers, rows } = parseMarkdownTable(table)
  return (
    <>
      <table
        className={classNames(
          tableStyle.table,
          headers.length > 4 && tableStyle.complex,
        )}
      >
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
        {caption && (
          <caption className={tableStyle.caption}>
            <ImageCredit>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.inlineLexer(caption, []),
                }}
              />
            </ImageCredit>
          </caption>
        )}
      </table>
    </>
  )
}

export default TableContentBlock
