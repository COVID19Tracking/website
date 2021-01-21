import React from 'react'
import classnames from 'classnames'
import { FieldName } from '~components/utils/field-name'
import { FormatNumber } from '~components/utils/format'
import tableStyles from './table.module.scss'
import tableResponsiveStyles from './table-responsive.module.scss'

const TableResponsive = ({ labels, data, header }) => (
  <table className={classnames(tableStyles.table, tableResponsiveStyles.table)}>
    {header && (
      <thead className={tableResponsiveStyles.headerNoBorder}>{header}</thead>
    )}
    <thead>
      <tr>
        {labels.map(({ label, field, alignLeft, headerStyle }) => (
          <th
            scope="col"
            className={classnames(
              alignLeft && tableStyles.alignLeft,
              headerStyle,
            )}
          >
            {label || <FieldName field={field} />}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map(row => (
        <tr>
          {labels.map(
            ({ field, label, format, isNumeric, noWrap, alignLeft, style }) => (
              <td
                className={classnames(
                  noWrap && tableResponsiveStyles.noWrap,
                  alignLeft && tableStyles.alignLeft,
                  style,
                )}
              >
                <span className={tableResponsiveStyles.cellLabel} aria-hidden>
                  {label || <FieldName field={field} />}
                </span>
                <span className={tableResponsiveStyles.value}>
                  {isNumeric ? (
                    <FormatNumber number={row[field]} />
                  ) : (
                    <>{format ? format(row[field]) : row[field]}</>
                  )}
                </span>
              </td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  </table>
)

export default TableResponsive
