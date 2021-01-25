import React from 'react'
import { FormatDate } from '~components/utils/format'

const DataAsOf = ({ stateDate, ctpDate }) => {
  return (
    <div>
      Data as of <FormatDate date={stateDate} format="LLLL d, yyyy" /> | Data
      last collected by CTP {ctpDate}
    </div>
  )
}

export default DataAsOf
