import React from 'react'
import stateContactStyle from './state-contact.module.scss'

export default ({ currentState }) => (
  <div className={stateContactStyle.container}>
    Contact {currentState} (todo complete this, connect to API)
  </div>
)
