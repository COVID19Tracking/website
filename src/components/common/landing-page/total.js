import React from 'react'
import totalStyle from './total.module.scss'

const role = 'text'
export default ({ number, label }) => (
  <div className={totalStyle.total} role={role}>
    <div className={totalStyle.number}>{number}</div>
    <div className={totalStyle.label}>{label}</div>
  </div>
)
