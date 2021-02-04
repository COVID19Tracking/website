import React, { Fragment } from 'react'
import { DateTime } from 'luxon'

function lowercaseMeridiem(dateString) {
  return dateString.replace('AM', 'am').replace('PM', 'pm')
}

function formatDateToString(date, format = 'ccc LLL d yyyy h:mm a') {
  if (typeof date === 'undefined') {
    return null
  }
  return lowercaseMeridiem(
    DateTime.fromISO(date)
      .setZone('America/New_York')
      .toFormat(format),
  )
}

const FormatDate = ({
  date,
  format = 'ccc LLL d yyyy h:mm a',
  timezone = true,
}) => {
  // tokens spec: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
  return (
    <>
      {timezone
        ? formatDateToString(date, format)
        : DateTime.fromISO(date).toFormat(format)}
    </>
  )
}

const FormatNumber = ({ number, nullValue = false, precision = 0 }) => {
  const nullDisplay = nullValue || 'N/A'
  let roundedNumber
  if (precision === 0) {
    roundedNumber = number
  } else {
    const precisionDenominator = 10 ** precision
    roundedNumber =
      Math.round(parseFloat(number) * precisionDenominator) /
      precisionDenominator
  }
  return (
    <>{roundedNumber !== null ? roundedNumber.toLocaleString() : nullDisplay}</>
  )
}

const getListSpacer = (index, length, useAmpersand = true) => {
  const andSign = useAmpersand ? '&' : 'and'
  if (index === 0 && length === 2) {
    return ` ${andSign} ` // first item, only two items in the list
  }
  if (index === length - 2) {
    return `, ${andSign} ` // second to last item
  }
  if (index === length - 1) {
    return '' // last item
  }
  return ', '
}

const getOrListSpacer = (index, length) => {
  if (index === 0 && length === 2) {
    return ' or ' // first item, only two items in the list
  }
  if (index === length - 2) {
    return ', or ' // second to last item
  }
  if (index === length - 1) {
    return '' // last item
  }
  return ', '
}

/**
 * Separates a list of components by `&` or `and`
 *
 * @param {array} items A list of components
 * @param {array} keys The keys to use for the items
 * @returns {string} The formatted fragment
 */
const FormatItemList = ({ items, keys, useAmpersand = true }) => {
  const { length } = items
  return (
    <>
      {items.map((item, index) => {
        const listSpacer = getListSpacer(index, length, useAmpersand)
        return (
          <Fragment key={keys[index]}>
            {item}
            {listSpacer === '' ? undefined : listSpacer}
          </Fragment>
        )
      })}
    </>
  )
}

/**
 * Separates a list of components by `,` and `or`.
 *
 * @param {array} items A list of components
 * @param {array} keys The keys to use for the items
 * @returns {string} The formatted fragment
 */
const FormatItemOrList = ({ items, keys }) => {
  const { length } = items
  return (
    <>
      {items.map((item, index) => {
        const listSpacer = getOrListSpacer(index, length)
        return (
          <Fragment key={keys[index]}>
            {item}
            {listSpacer === '' ? undefined : listSpacer}
          </Fragment>
        )
      })}
    </>
  )
}

/**
 * Separates a list of strings by `&` or `and`
 *
 * @param {array} items A list of strings to be formatted
 * @returns {string} The formatted list
 */
const formatStringList = (items, useAmpersand = true) => {
  const { length } = items
  return items.reduce(
    (acc, item, idx) => acc + item + getListSpacer(idx, length, useAmpersand),
    '',
  )
}

export {
  FormatDate,
  FormatNumber,
  lowercaseMeridiem,
  formatDateToString,
  FormatItemList,
  FormatItemOrList,
  formatStringList,
}
