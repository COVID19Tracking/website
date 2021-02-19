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

const getGroupValue = value => {
  if (value === null) {
    return null
  }
  return value * 100 // perCap is *per 1,000*, multiply by 100 to get *per 100,000*
}

const getGroups = state => {
  if (state === undefined) {
    return {}
  }

  let groups = [
    {
      label: 'Black\u200a/\u200aAfrican American',
      style: socialCardStyle.barBlack,
      cases: getGroupValue(state.blackPosPerCap),
      deaths: getGroupValue(state.blackDeathPerCap),
      showAsterisk: state.blackSmallN, // show asterisk if SmallN is true
      showCross: false,
    },
    {
      label: 'Hispanic\u200a/\u200aLatino',
      style: socialCardStyle.barLatinx,
      cases: getGroupValue(state.latinXPosPerCap),
      deaths: getGroupValue(state.latinXDeathPerCap),
      showAsterisk: state.latinXSmallN,
      showCross: false,
    },
    {
      label: 'Asian',
      style: socialCardStyle.barAsian,
      cases: getGroupValue(state.asianPosPerCap),
      deaths: getGroupValue(state.asianDeathPerCap),
      showAsterisk: state.asianSmallN,
      showCross: false,
    },
    {
      label: 'American Indian\u200a/\u200aAlaskan Native',
      style: socialCardStyle.barAian,
      cases: getGroupValue(state.aianPosPerCap),
      deaths: getGroupValue(state.aianDeathPerCap),
      showAsterisk: state.aianSmallN,
      showCross: false,
    },
    {
      label: 'White',
      style: socialCardStyle.barWhite,
      cases: getGroupValue(state.whitePosPerCap),
      deaths: getGroupValue(state.whiteDeathPerCap),
      showAsterisk: state.whiteSmallN,
      showCross: false,
    },
    {
      label: 'Asian\u200a/\u200aPacific Islander',
      style: socialCardStyle.barAPi,
      cases: getGroupValue(state.apiPosPerCap),
      deaths: getGroupValue(state.apiDeathPerCap),
      showAsterisk: state.apiSmallN,
      showCross: false,
    },
    {
      label: 'Native Hawaiian\u200a/\u200aOther Pacific Islander',
      style: socialCardStyle.barNhpi,
      cases: getGroupValue(state.nhpiPosPerCap),
      deaths: getGroupValue(state.nhpiDeathPerCap),
      showAsterisk: state.nhpiSmallN,
      showCross: false,
    },
  ]

  let allNulls = true // assume all values are null
  groups.forEach(group => {
    if (group.cases !== null) {
      allNulls = false
    }
    if (group.deaths !== null) {
      allNulls = false
    }
  })

  if (allNulls) {
    // if the state reports no race data
    return {}
  }

  const aPi = groups.find(group => group.label === 'Asian\u200a/\u200aPacific Islander')

  if (aPi.cases == null && aPi.deaths == null) {
    // if the aPi values do not exist...
    groups = groups.filter(
      // remove the aPi bar
      group => group.label !== 'Asian\u200a/\u200aPacific Islander',
    )
  } else {
    // if the aPi values exist
    groups = groups.filter(
      // remove asian and NHPI bars
      group =>
        group.label !== 'Native Hawaiian\u200a/\u200aOther Pacific Islander' &&
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
    e.g., "In Hawaii, as of September 16, Asians\u200a/\u200aPacific Islanders
    have the highest COVID-19 infection rates..."
  */
  const copyLabels = {
    'Black\u200a/\u200aAfrican American': 'Black\u200a/\u200aAfrican American people',
    'Hispanic\u200a/\u200aLatino': 'Hispanic\u200a/\u200aLatino people',
    Asian: 'Asian people',
    White: 'White people',
    'Asian\u200a/\u200aPacific Islander': 'Asians\u200a/\u200aPacific Islanders',
    'Native Hawaiian\u200a/\u200aOther Pacific Islander':
      'Native Hawaiians\u200a/\u200aOther Pacific Islanders',
    'American Indian\u200a/\u200aAlaskan Native': 'American Indians\u200a/\u200aAlaskan Natives',
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
    return 'no data'
  }

  if (stateStatus.deathsOnly) {
    return 'mortality data'
  }

  if (stateStatus.casesOnly) {
    return 'infection data'
  }

  return 'infection and mortality data'
}

const getBarWidth = (number, max, square, oneChart) => {
  let maxPixels
  if (square) {
    if (oneChart) {
      maxPixels = 518
    }
    if (!oneChart) {
      maxPixels = 238
    }
  }
  if (!square) {
    if (oneChart) {
      maxPixels = 525
    }
    if (!oneChart) {
      maxPixels = 240
    }
  }
  return (number / max) * maxPixels
}

export { getStateStatus, getGroups, getTypeOfRates, getBarWidth }
