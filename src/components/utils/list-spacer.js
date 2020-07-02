import React from 'react'

export default ({ index, length, useAmbersand = false }) => {
  const andSign = useAmbersand ? '&' : 'and'
  if (index === 0 && length === 2) {
    return <> {andSign} </> // first author, only two items in the list
  }
  if (index === length - 2) {
    return <>, {andSign} </> // second to last author
  }
  if (index === length - 1) {
    return null // last author
  }
  return <>, </>
}
