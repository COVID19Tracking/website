import React from 'react'

const Table = ({ children, className, tablesawMode }) => (
  <table className={className} data-tablesaw-mode={tablesawMode}>
    {children}
  </table>
)

export default Table
