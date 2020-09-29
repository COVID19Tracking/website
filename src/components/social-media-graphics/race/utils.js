import socialCardStyle from './social-card.module.scss'

const getStateStatus = (state, combinedStates) => {
  let noDeaths
  let noCases

  const isCombinedState = combinedStates.indexOf(state.state) >= 0

  if (isCombinedState) {
    // if this state combines race and ethnicity data
    noDeaths = parseFloat(state.knownRaceEthDeath) === 0
    noCases = parseFloat(state.knownRaceEthPos) === 0
  } else {
    noDeaths = parseFloat(state.knownRaceDeath) === 0
    noCases = parseFloat(state.knownRacePos) === 0
  }

  const oneChart = (noCases || noDeaths) && !(noCases && noDeaths)

  const noCharts = noCases && noDeaths

  const casesOnly = oneChart && noDeaths

  const deathsOnly = oneChart && noCases

  return {
    oneChart,
    noCharts,
    casesOnly,
    deathsOnly,
  }
}

const getGroups = state => {
  if (state === undefined) {
    return {}
  }

  let groups = [
    {
      label: 'Black/African American',
      style: socialCardStyle.barBlack,
      cases:
        state.blackPosPercap !== null ? state.blackPosPercap * 100 : null, // perCap is *per 1,000*, mulitply by 100 to get *per 100,000*
      deaths:
        state.blackDeathPercap === ''
          ? undefined
          : state.blackDeathPercap * 100,
    },
    {
      label: 'Hispanic/Latino',
      style: socialCardStyle.barLatinx,
      cases:
        state.latinXPosPercap !== null ? state.latinXPosPercap * 100 : null,
      deaths:
        state.latinXDeathPercap === ''
          ? undefined
          : state.latinXDeathPercap * 100,
    },
    {
      label: 'Asian',
      style: socialCardStyle.barAsian,
      cases:
        state.asianPosPercap !== null ? state.asianPosPercap * 100 : null,
      deaths:
        state.asianDeathPercap === ''
          ? undefined
          : state.asianDeathPercap * 100,
    },
    {
      label: 'American Indian/ Alaska Native',
      style: socialCardStyle.barAian,
      cases: state.aianPosPercap !== null ? state.aianPosPercap * 100 : null,
      deaths:
        state.aianDeathPercap !== null ? state.aianDeathPercap * 100 : null,
    },
    {
      label: 'White',
      style: socialCardStyle.barWhite,
      cases:
        state.whitePosPercap !== null ? state.whitePosPercap * 100 : null,
      deaths:
        state.whiteDeathPercap === ''
          ? undefined
          : state.whiteDeathPercap * 100,
    },
    {
      label: 'Asian/Pacific Islander',
      style: socialCardStyle.barAPi,
      cases: state.apiPosPercap !== null ? state.apiPosPercap * 100 : null,
      deaths:
        state.apiDeathPercap !== null ? state.apiDeathPercap * 100 : null,
    },
    {
      label: 'Native Hawaiian/ Pacific Islander',
      style: socialCardStyle.barNhpi,
      cases: state.nhpiPosPercap !== null ? state.nhpiPosPercap * 100 : null,
      deaths:
        state.nhpiDeathPercap !== null ? state.nhpiDeathPercap * 100 : null,
    },
  ]

  const aPi = groups.find(group => group.label === 'Asian/Pacific Islander')

  if (aPi.cases === null && aPi.deaths === null) {
    groups = groups.filter(
      // remove API bar
      group => group.label !== 'Asian/Pacific Islander',
    )
  } else {
    groups = groups.filter(
      // remove asian and NHPI bars
      group =>
        group.label !== 'Native Hawaiian/ Pacific Islander' &&
        group.label !== 'Asian',
    )
  }

  groups = groups.filter(
    // remove groups without case or death data
    group => !(group.cases === null && group.deaths === null),
  )

  const maxCasesPerCap = Math.max(...groups.map(group => group.cases))
  const maxDeathsPerCap = Math.max(...groups.map(group => group.deaths))

  groups.sort((a, b) => {
    // sort bars by # of deaths
    if (a.deaths >= b.deaths) {
      return -1
    }
    return 1
  })

  /*
    Copy to be used whenever {{GROUP}} is written
    e.g., "In Hawaii, as of September 16, Asians/Pacific Islanders
    have the highest COVID-19 infection rates..."
  */
  const copyLabels = {
    'Black/African American': 'Black/African American people',
    'Hispanic/Latino': 'Hispanic/Latino people',
    Asian: 'Asian people',
    White: 'White people',
    'Asian/Pacific Islander': 'Asians/Pacific Islanders',
    'Native Hawaiian/ Pacific Islander': 'Native Hawaiians/Pacific Islanders',
    'American Indian/ Alaska Native': 'American Indians/Alaska Natives',
  }

  const worstDeathsValue = Math.round(groups[0].deaths)
  const worstDeathsGroup = copyLabels[groups[0].label]

  groups.sort((a, b) => {
    // sort bars by # of cases
    if (a.cases >= b.cases) {
      return -1
    }
    return 1
  })

  const worstCasesValue = Math.round(groups[0].cases)
  const worstCasesGroup = copyLabels[groups[0].label]

  groups.forEach(group => {
    /* eslint-disable no-param-reassign */
    if (group.cases) {
      group.cases = Math.round(group.cases)
    }
    if (group.deaths) {
      group.deaths = Math.round(group.deaths)
    }
  })

  return {
    groups,
    maxCasesPerCap,
    maxDeathsPerCap,
    worstCasesGroup,
    worstCasesValue,
    worstDeathsGroup,
    worstDeathsValue,
  }
}

const getTypeOfRates = (state, combinedStates) => {
  const stateStatus = getStateStatus(state, combinedStates)

  if (stateStatus.noCharts) {
    return 'no rates'
  }

  if (stateStatus.deathsOnly) {
    return 'mortality rates'
  }

  if (stateStatus.casesOnly) {
    return 'infection rates'
  }

  return 'infection and mortality rates'
}

export { getStateStatus, getGroups, getTypeOfRates }
