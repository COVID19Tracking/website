import React from 'react'

import SocialCardLocale from './locale'
import { getGroups } from './utils'

const SocialCardHeader = ({ state, stateName, noCharts }) => {
  const today = new Date()
  const { worstCasesGroup, worstDeathsGroup } = getGroups(state)

  const name = state.name || stateName

  if (noCharts) {
    return (
      <>
        <SocialCardLocale name={name} />, race and ethnicity information is
        still not reported for COVID-19 cases and deaths. Help us get better
        data by contacting health officials at
        https://covidtracking.com/race/get-better-data.
      </>
    )
  }

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
