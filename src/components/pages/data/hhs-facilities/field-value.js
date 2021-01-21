import React from 'react'

const FieldValue = ({ field, percent }) => {
  if (typeof field === 'undefined' || field === '') {
    return <>N/A</>
  }
  if (field > -1) {
    return (
      <>{`${percent ? `${Math.round(field * 100)}%` : Math.round(field)}`}</>
    )
  }
  return <>between 0 and 4{percent && <>%</>}</>
}

export default FieldValue
