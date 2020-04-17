import React from 'react'
import getInvolvedStyles from './get-involved.module.scss'

export default ({ items }) => {
  return (
    <ul className={getInvolvedStyles.getInvolved}>
      {items.map(node => (
        <li className={getInvolvedStyles.getInvolvedItem}>
          {node}
          <span aria-hidden className={getInvolvedStyles.getInvolvedIcon}>
            →
          </span>
        </li>
      ))}
    </ul>
  )
}
