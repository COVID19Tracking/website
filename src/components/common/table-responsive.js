import React from 'react'
import classnames from 'classnames'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'

import { FieldName } from '~components/utils/field-name'
import { FormatNumber } from '~components/utils/format'

import tableStyles from './table.module.scss'
import tableResponsiveStyles from './table-responsive.module.scss'

const TableRow = ({ labels, row }) => (
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
              <>{format ? format(row[field]) : row[field] || 'N/A'}</>
            )}
          </span>
        </td>
      ),
    )}
  </tr>
)

const TableResponsive = ({
  labels,
  data,
  header,
  mobileShowNRows = data.length, // the number of rows to show on mobile
}) => (
  <table className={classnames(tableStyles.table, tableResponsiveStyles.table)}>
    {header && (
      <thead className={tableResponsiveStyles.customHeader}>{header}</thead>
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
      <>
        {data.slice(0, mobileShowNRows).map(row => (
          <TableRow labels={labels} row={row} />
        ))}
        <Disclosure>
          <tr className={tableResponsiveStyles.disclosureButton}>
            <td colSpan={labels.length}>
              <DisclosureButton>
                <span className={tableResponsiveStyles.closed}>Show</span>
                <span className={tableResponsiveStyles.expanded}>Hide</span> all
                rows
              </DisclosureButton>
            </td>
          </tr>
          <DisclosurePanel className={tableResponsiveStyles.disclosurePanel}>
            {data.slice(mobileShowNRows, data.length).map(row => (
              <TableRow labels={labels} row={row} />
            ))}
          </DisclosurePanel>
        </Disclosure>
      </>
    </tbody>
  </table>
)

export default TableResponsive
