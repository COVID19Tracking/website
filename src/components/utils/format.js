import React from 'react'
import { DateTime } from 'luxon'

function lowercaseMeridiem(dateString) {
  return dateString.replace('AM', 'am').replace('PM', 'pm')
}

function formatDateToString(date, format = 'ccc LLL d yyyy h:mm a', inEt) {
  if (typeof date === 'undefined') {
    return null
  }
  // using UTC here since the time is *already* on New York time, and
  // setting UTC simply preserves that value
  const timeZone = inEt ? 'UTC' : 'America/New_York'
  return lowercaseMeridiem(
    DateTime.fromISO(date)
      .setZone(timeZone)
      .toFormat(format),
  )
}

const FormatDate = ({
  date,
  format = 'ccc LLL d yyyy h:mm a',
  timezone = true,
  // inEt means this date *appears* to be in UTC, but actually shows the
  // current time in Eastern Time i.e. if a date time appears like:
  // 2020-06-19T18:00:00Z, but actually means 6:00 pm *EST*, not 6:00 pm UTC
  inEt = false,
}) => (
  <>
    {timezone
      ? formatDateToString(date, format, inEt)
      : DateTime.fromISO(date).toFormat(format)}
  </>
)

const FormatNumber = ({ number }) => (
  <>{number || number === 0 ? number.toLocaleString() : 'N/A'}</>
)

export { FormatDate, FormatNumber, lowercaseMeridiem, formatDateToString }
