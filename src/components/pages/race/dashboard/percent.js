import React from 'react'

export default ({ number }) => (
  <>{number * 100 > 1 ? Math.round(number * 100) : '<1'}%</>
)
