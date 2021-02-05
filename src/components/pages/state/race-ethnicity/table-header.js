import React from 'react'

import styles from './table-header.module.scss'

const TableHeader = ({ header, inner = false }) => {
  if (!inner) {
    return (
      <tr>
        <th colSpan="100%">
          <h4 className={styles.tableHeader}>{header}</h4>
        </th>
      </tr>
    )
  }
  return (
    <th colSpan="100%">
      <h4 className={styles.tableHeader}>{header}</h4>
    </th>
  )
}

const RaceTableHeader = ({ isPer100k, isSeparate }) => (
  <tr>
    {isSeparate && (
      <th colSpan={isPer100k ? 1 : 2} className={styles.hidden}>
        <span>Historical data for</span>
      </th>
    )}
    <TableHeader header={isSeparate ? 'Race' : 'Race/Ethnicity'} inner />
  </tr>
)

export default TableHeader

export { TableHeader, RaceTableHeader }
