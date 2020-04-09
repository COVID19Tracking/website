import React from 'react'
import thousands from '../../../utilities/format-thousands'

export default ({ population }) => (
  <p className="state-population">
    <span>Population: {thousands(population)}</span>
  </p>
)
