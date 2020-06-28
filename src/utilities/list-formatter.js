/**
 * Separates list items by `&` or `and`
 */
export const listSpacer = ({ index, length, useAmpersand = true }) => {
  const andSign = useAmpersand ? '&' : 'and'
  if (index === length - 2) {
    return ` ${andSign} ` // second to last author
  }
  if (index === length - 1) {
    return `` // last author
  }
  return `, `
}

export const stringifyList = ({ arr, useAmpersand = true }) =>
  arr
    .map(
      (item, index) =>
        `${item}${listSpacer({ index, length: arr.length, useAmpersand })}`,
    )
    .join('')
