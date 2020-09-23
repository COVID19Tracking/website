import React from 'react'

import SocialCardLocale from './locale'
import { getGroups } from './utils'

const SocialCardHeader = ({ state, stateName }) => {
  const today = new Date()
  const { worstCasesGroup, worstDeathsGroup } = getGroups(state)

  const name = state.name || stateName

  if (worstDeathsGroup === worstCasesGroup) {
    return (
      <>
        <SocialCardLocale name={name} />, as of{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstCasesGroup} had the highest risk of contracting COVID-19 and were
        also most likely to have died.
      </>
    )
  }
  return (
    <>
      <SocialCardLocale name={name} />, as of{' '}
      {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
      {worstCasesGroup} had the highest risk of contracting COVID-19.{' '}
      {worstDeathsGroup} were most likely to have died.
    </>
  )
}

export default SocialCardHeader
