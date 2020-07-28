import React from 'react'
import classnames from 'classnames'
import { FieldName } from '~components/utils/field-name'
import tableStyles from './table.module.scss'
import tableResponsiveStyles from './table-responsive.module.scss'

export default ({ labels, data }) => (
  <table className={classnames(tableStyles.table, tableResponsiveStyles.table)}>
    <thead>
      <tr>
        {labels.map(({ label, field }) => (
          <th scope="col">{label || <FieldName field={field} />}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map(row => (
        <tr>
          {labels.map(({ field, label, format }) => (
            <td>
              <span className={tableResponsiveStyles.label}>
                {label || <FieldName field={field} />}
              </span>
              <span className={tableResponsiveStyles.value}>
                {format ? format(row[field]) : row[field]}
              </span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
