import React from 'react'

export default ({ number }) => {
  if (number !== null) {
    return <>{number * 100 > 1 ? Math.round(number * 100) : '<1'}%</>
  }
  return <>–</>
}
