import React from 'react'

const FieldValue = ({ field, percent }) => {
  if (typeof field === 'undefined') {
    return <>N/A</>
  }
  if (field > 0) {
    return (
      <>{`${
        percent ? `${Math.round(field * 100)}%` : Math.round(field * 10) / 10
      }`}</>
    )
  }
  return <>between 0 and 4{percent && <>%</>}</>
}

export default FieldValue
