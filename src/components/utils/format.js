import React from 'react'
import { DateTime } from 'luxon'

function lowercaseMeridiem(dateString) {
  return dateString.replace('AM', 'am').replace('PM', 'pm')
}

function formatDateToString(date, format = "ccc LLL d yyyy h:mm a 'ET'") {
  if (typeof date === 'undefined') {
    return null
  }
  return lowercaseMeridiem(
    DateTime.fromISO(date)
      .setZone('America/New_York')
      .toFormat(format),
  )
}

const FormatDate = ({ date, format = "ccc LLL d yyyy h:mm a 'ET'" }) => {
  return <>{formatDateToString(date, format)}</>
}

const FormatNumber = ({ number }) => (
  <>{number || number === 0 ? number.toLocaleString() : 'N/A'}</>
)

export { FormatDate, FormatNumber, lowercaseMeridiem, formatDateToString }
