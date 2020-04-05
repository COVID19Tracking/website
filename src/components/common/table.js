import React from 'react'
import DetailText from './detail-text'

const Table = ({ children, className, tableLabel }) => (
  <div>
    <table className={className}>{children}</table>
    {tableLabel && <DetailText>{tableLabel}</DetailText>}
  </div>
)

export default Table
