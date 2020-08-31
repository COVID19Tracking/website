import React from 'react'
import classnames from 'classnames'
import { FieldName } from '~components/utils/field-name'
import { FormatNumber } from '~components/utils/format'
import tableStyles from './table.module.scss'
import tableResponsiveStyles from './table-responsive.module.scss'

export default ({ labels, data }) => (
  <table className={classnames(tableStyles.table, tableResponsiveStyles.table)}>
    <thead>
      <tr>
        {labels.map(({ label, field, alignLeft }) => (
          <th
            scope="col"
            className={classnames(alignLeft && tableStyles.alignLeft)}
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
            ({ field, label, format, isNumeric, noWrap, alignLeft }) => (
              <td
                className={classnames(
                  noWrap && tableResponsiveStyles.noWrap,
                  alignLeft && tableStyles.alignLeft,
                )}
              >
                <span className={tableResponsiveStyles.label}>
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
