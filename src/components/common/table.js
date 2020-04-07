import React from 'react'
import DetailText from './detail-text'
import tableStyle from '../../scss/components/common/table.module.scss'

const Table = ({ children, tableLabel }) => (
  <div>
    <table className={tableStyle.table}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export default Table
