import { DateTime } from 'luxon'

export default (date, format) => {
  if (typeof date === 'undefined') {
    return ''
  }
  if (!format) {
    format = 'dd LLL yyyy ccc'
  }
  return DateTime.fromISO(date).toFormat(format)
}
