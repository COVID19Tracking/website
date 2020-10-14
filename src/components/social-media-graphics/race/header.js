import React from 'react'

import SocialCardLocale from './locale'
import { getGroups, getStateStatus } from './utils'

const SocialCardHeader = ({ state, stateName, noCharts, combinedStates }) => {
  const { casesOnly, deathsOnly } = getStateStatus(state, combinedStates)
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

  if (casesOnly) {
    return (
      <>
        <SocialCardLocale name={name} />, through{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19.
      </>
    )
  }
  if (deathsOnly) {
    return (
      <>
        <SocialCardLocale name={name} />, through{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstDeathsGroup} were most likely to have died from COVID-19.
      </>
    )
  }
  if (state.deathRateSmallN) {
    return (
      <>
        <SocialCardLocale name={name} />, through{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19.
      </>
    )
  }
  if (worstDeathsGroup === worstCasesGroup) {
    return (
      <>
        <SocialCardLocale name={name} />, through{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19 and were
        also most likely to have died.
      </>
    )
  }
  return (
    <>
      <SocialCardLocale name={name} />, through{' '}
      {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
      {worstCasesGroup} were most likely to have contracted COVID-19.{' '}
      {worstDeathsGroup} were most likely to have died.
    </>
  )
}

export default SocialCardHeader
