import React from 'react'
import { FormatDate } from '~components/utils/format'

const DataAsOf = ({ stateDate, ctpDate }) => {
  return (
    <div>
      Data as of <FormatDate date={stateDate} format="LLLL d, yyyy" /> | Data
      last collected by CTP <FormatDate date={ctpDate} format="LLLL d, yyyy" />
    </div>
  )
}

export default DataAsOf
