/* eslint react/no-array-index-key:0 */
import React from 'react'
import getInvolvedStyles from './get-involved.module.scss'

export default ({ items }) => {
  return (
    <div>
      {items.map((item, key) => (
        <div
          key={`get-involved-${key}`}
          className={getInvolvedStyles.getInvolved}
        >
          <div className={getInvolvedStyles.getInvolvedIcon}>→</div>
          {item}
        </div>
      ))}
    </div>
  )
}
