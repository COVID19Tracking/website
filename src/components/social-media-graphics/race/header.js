import React from 'react'

import SocialCardLocale from './locale'
import { getGroups, getStateStatus } from './utils'
import { formatDateToString } from '~components/utils/format'

const SocialCardHeader = ({
  state,
  stateName,
  noCharts,
  combinedStates,
  lastUpdatedByCtp,
}) => {
  const { casesOnly, deathsOnly } = getStateStatus(state, combinedStates)
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

  const getLastUpdatedDate = () => {
    return formatDateToString(lastUpdatedByCtp, 'LLLL d, yyyy')
  }

  if (casesOnly) {
    return (
      <>
        <SocialCardLocale name={name} />, through {getLastUpdatedDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19.
      </>
    )
  }
  if (deathsOnly) {
    return (
      <>
        <SocialCardLocale name={name} />, through {getLastUpdatedDate()},{' '}
        {worstDeathsGroup} were most likely to have died from COVID-19.
      </>
    )
  }
  if (state.deathRateSmallN) {
    return (
      <>
        <SocialCardLocale name={name} />, through {getLastUpdatedDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19.
      </>
    )
  }
  if (worstDeathsGroup === worstCasesGroup) {
    return (
      <>
        <SocialCardLocale name={name} />, through {getLastUpdatedDate()},{' '}
        {worstCasesGroup} were most likely to have contracted COVID-19 and were
        also most likely to have died.
      </>
    )
  }
  return (
    <>
      <SocialCardLocale name={name} />, through {getLastUpdatedDate()},{' '}
      {worstCasesGroup} were most likely to have contracted COVID-19.{' '}
      {worstDeathsGroup} were most likely to have died.
    </>
  )
}

export default SocialCardHeader
