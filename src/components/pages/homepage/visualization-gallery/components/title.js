import React from 'react'
import headingStyle from './title.module.scss'

const Heading = ({ title, children }) => (
  <div className={headingStyle.title}>
    <h3>{title}</h3>
    {children}
  </div>
)

export default Heading
