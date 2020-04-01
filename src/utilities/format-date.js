import { DateTime } from 'luxon'

export default (date, format = 'dd LLL yyyy ccc') => {
  if (typeof date === 'undefined') {
    return ''
  }
  return DateTime.fromISO(date).toFormat(format)
}
