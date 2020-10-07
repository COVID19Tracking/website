import {
  getStateStatus,
  getGroups,
  getTypeOfRates,
  getBarWidth,
} from '~components/social-media-graphics/race/utils'

test('Components : Social Media Graphics : Race : Utils : getBarWidth', () => {
  expect(getBarWidth(50, 100, false, false)).toBe(120)
  expect(getBarWidth(50, 100, false, true)).toBe(262.5)
  expect(getBarWidth(50, 100, true, true)).toBe(259)
  expect(getBarWidth(50, 100, true, false)).toBe(119)
})

const deathsOnlyState = {
  state: 'NJ',
  name: 'New Jersey',
  knownRaceEthPos: '0',
}

const casesOnlyState = {
  state: 'NJ',
  name: 'New Jersey',
  knownRaceEthDeath: '0',
}

const noChartsState = {
  state: 'NJ',
  name: 'New Jersey',
  knownRaceEthPos: '0',
  knownRaceEthDeath: '0',
}

const standardState = {
  state: 'CT',
  name: 'Connecticut',
  knownRaceEthPos: 0.7,
  knownRaceEthDeath: 0.99,
  blackPosPerCap: 21.19,
  blackDeathPerCap: 0.32,
  latinXPosPerCap: 20.27,
  latinXDeathPerCap: 0.71,
  asianPosPerCap: null,
  asianDeathPerCap: null,
  aianPosPerCap: 10.9,
  aianDeathPerCap: 0.37,
  whitePosPerCap: 8.35,
  whiteDeathPerCap: 1.36,
  nhpiPosPerCap: null,
  nhpiDeathPerCap: null,
  apiPosPerCap: 5.37,
  apiDeathPerCap: 0.3,
}

const combinedStates = ['NJ']

test('Components : Social Media Graphics : Race : Utils : getTypeOfRates', () => {
  expect(getTypeOfRates(deathsOnlyState, combinedStates)).toBe(
    'mortality rates',
  )
  expect(getTypeOfRates(casesOnlyState, combinedStates)).toBe('infection rates')
  expect(getTypeOfRates(noChartsState, combinedStates)).toBe('no rates')
  expect(getTypeOfRates(standardState, combinedStates)).toBe(
    'infection and mortality rates',
  )
})

test('Components : Social Media Graphics : Race : Utils : getStateStatus', () => {
  expect(getStateStatus(deathsOnlyState, combinedStates)).toMatchObject({
    oneChart: true,
    noCharts: false,
    casesOnly: false,
    deathsOnly: true,
  })
  expect(getStateStatus(casesOnlyState, combinedStates)).toMatchObject({
    oneChart: true,
    noCharts: false,
    casesOnly: true,
    deathsOnly: false,
  })
  expect(getStateStatus(noChartsState, combinedStates)).toMatchObject({
    oneChart: false,
    noCharts: true,
    casesOnly: false,
    deathsOnly: false,
  })
  expect(getStateStatus(standardState, combinedStates)).toMatchObject({
    oneChart: false,
    noCharts: false,
    casesOnly: false,
    deathsOnly: false,
  })
})

test('Components : Social Media Graphics : Race : Utils : getGroups', () => {
  expect(getGroups(undefined)).toMatchObject({})

  const nullState = {
    aianDeathPerCap: null,
    aianPosPerCap: null,
    apiDeathPerCap: null,
    apiPosPerCap: null,
    asianDeathPerCap: null,
    asianPosPerCap: null,
    blackDeathPerCap: null,
    blackPosPerCap: null,
    latinXDeathPerCap: null,
    latinXPosPerCap: null,
    nhpiDeathPerCap: null,
    nhpiPosPerCap: null,
    whiteDeathPerCap: null,
    whitePosPerCap: null,
  }

  expect(getGroups(nullState)).toMatchObject({})

  const baseState = {
    aianDeathPerCap: 45.61,
    aianPosPerCap: 26.99,
    apiDeathPerCap: 7.02,
    apiPosPerCap: 11.13,
    asianDeathPerCap: 68.71,
    asianPosPerCap: 78.32,
    blackDeathPerCap: 90.37,
    blackPosPerCap: 88.32,
    latinXDeathPerCap: 98.15,
    latinXPosPerCap: 1.57,
    nhpiDeathPerCap: 43.20,
    nhpiPosPerCap: 19.77,
    whiteDeathPerCap: 6.29,
    whitePosPerCap: 59.81,
  }

  expect(getGroups(baseState)).toMatchObject({})

  const noApiState = {
    aianDeathPerCap: 45.61,
    aianPosPerCap: 26.99,
    apiDeathPerCap: null,
    apiPosPerCap: null,
    asianDeathPerCap: 68.71,
    asianPosPerCap: 78.32,
    blackDeathPerCap: null,
    blackPosPerCap: null,
    latinXDeathPerCap: 98.15,
    latinXPosPerCap: 1.57,
    nhpiDeathPerCap: 43.20,
    nhpiPosPerCap: 19.77,
    whiteDeathPerCap: 6.29,
    whitePosPerCap: 59.81,
  }

  expect(getGroups(noApiState)).toMatchObject({})
})
