const perCapTo100k = value => {
  if (value == null) {
    return 'N/A'
  }
  return Math.round(value * 100)
}

const createValuesList = raceData => {
  if (raceData === undefined) {
    return []
  }
  const values = []

  // perCap is *per 1,000*, multiply by 100 to get *per 100,000*
  if (raceData.aianDeathPerCap != null || raceData.aianPosPerCap != null) {
    values.push({
      name: 'American Indian/Alaska Native',
      deathsValue: perCapTo100k(raceData.aianDeathPerCap),
      casesValue: perCapTo100k(raceData.aianPosPerCap),
      asterisk: raceData.aianSmallN ? '*' : '',
    })
  }
  if (raceData.apiDeathPerCap != null || raceData.apiPosPerCap != null) {
    values.push({
      name: 'Asian/Pacific Islander',
      deathsValue: perCapTo100k(raceData.apiDeathPerCap),
      casesValue: perCapTo100k(raceData.apiPosPerCap),
      asterisk: raceData.apiSmallN ? '*' : '',
    })
  }
  if (raceData.asianDeathPerCap != null || raceData.asianPosPerCap != null) {
    values.push({
      name: 'Asian',
      deathsValue: perCapTo100k(raceData.asianDeathPerCap),
      casesValue: perCapTo100k(raceData.asianPosPerCap),
      asterisk: raceData.asianSmallN ? '*' : '',
    })
  }
  if (raceData.blackDeathPerCap != null || raceData.blackPosPerCap != null) {
    values.push({
      name: 'Black/African American',
      deathsValue: perCapTo100k(raceData.blackDeathPerCap),
      casesValue: perCapTo100k(raceData.blackPosPerCap),
      asterisk: raceData.blackSmallN ? '*' : '',
    })
  }
  if (raceData.latinXDeathPerCap != null || raceData.latinXPosPerCap != null) {
    values.push({
      name: 'Hispanic/Latino',
      deathsValue: perCapTo100k(raceData.latinXDeathPerCap),
      casesValue: perCapTo100k(raceData.latinXPosPerCap),
      asterisk: raceData.latinXSmallN ? '*' : '',
    })
  }
  if (raceData.nhpiDeathPerCap != null || raceData.nhpiPosPerCap != null) {
    values.push({
      name: 'Native Hawaiian/Pacific Islander',
      deathsValue: perCapTo100k(raceData.nhpiDeathPerCap),
      casesValue: perCapTo100k(raceData.nhpiPosPerCap),
      asterisk: raceData.nhpiSmallN ? '*' : '',
    })
  }
  if (raceData.whiteDeathPerCap != null || raceData.whitePosPerCap != null) {
    values.push({
      name: 'White',
      deathsValue: perCapTo100k(raceData.whiteDeathPerCap),
      casesValue: perCapTo100k(raceData.whitePosPerCap),
      asterisk: raceData.whiteSmallN ? '*' : '',
    })
  }

  let hasAsterisk = false

  // check if any values have an asterisk
  values.every(value => {
    if (value.asterisk === '*') {
      hasAsterisk = true
      return false // break out of every
    }
    return true // continue
  })

  let hasCases = false

  // check if there are any case values
  values.every(value => {
    if (value.casesValue !== 'N/A') {
      hasCases = true
      return false // break out of every
    }
    return true // continue
  })

  let hasDeaths = false

  // check if there are any case values
  values.every(value => {
    if (value.deathsValue !== 'N/A') {
      hasDeaths = true
      return false // break out of every
    }
    return true // continue
  })

  values.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  let lastCheckDate = raceData.lastCheckDate.value
  // change format from YYYY-MM-DD to YYYYMMDD
  lastCheckDate = lastCheckDate.split('-').join('')

  return {
    hasCases,
    hasDeaths,
    hasAsterisk,
    values,
    lastCheckDate,
  }
}

export default createValuesList
