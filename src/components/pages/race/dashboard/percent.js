import React from 'react'

export default ({ number }) => {
  if (number !== null) {
    if (Math.round(number * 100) === 0) {
      return '0%'
    }
    return <>{number * 100 > 1 ? Math.round(number * 100) : '<1'}%</>
  }
  return <>–</>
}
