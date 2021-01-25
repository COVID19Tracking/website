import React from 'react'

const DataAsOf = ({ stateDate, ctpDate }) => {
  return (
    <div>
      Data as of {stateDate} | Data last collected by CTP {ctpDate}
    </div>
  )
}

export default DataAsOf
