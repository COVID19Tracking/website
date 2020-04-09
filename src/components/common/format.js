import React from 'react'
import { DateTime } from 'luxon'

const FormatDate = ({ date, format = 'ccc LLLL d yyyy' }) => {
  if (typeof date === 'undefined') {
    return null
  }
  return <>{DateTime.fromISO(date).toFormat(format)}</>
}

const FormatNumber = ({ number }) => (
  <>
    {number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A'}
  </>
)

export { FormatDate, FormatNumber }
