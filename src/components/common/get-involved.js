import React from 'react'
import getInvolvedStyles from './get-involved.module.scss'

export default ({ items }) => {
  return (
    <div>
      {items.map(node => (
        <div className={getInvolvedStyles.getInvolved}>
          <div className={getInvolvedStyles.getInvolvedIcon}>→</div>
          {node}
        </div>
      ))}
    </div>
  )
}
