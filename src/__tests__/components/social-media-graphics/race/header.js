import React from 'react'
import renderer from 'react-test-renderer'
import MockDate from 'mockdate'
import Header from '~components/social-media-graphics/race/header'

beforeAll(() => {
  MockDate.set('2020-10-05')
})

afterAll(() => {
  MockDate.reset()
})

const state = {
  state: 'NJ',
}

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

const combinedStates = ['NJ']

const deathRateSmallNState = {
  state: 'NJ',
  name: 'New Jersey',
  deathRateSmallN: true,
  asianDeathPerCap: 0,
  blackDeathPerCap: 0.18,
  latinXDeathPerCap: 0.03,
  aianDeathPerCap: 1.06,
  whiteDeathPerCap: 0.04,
  nhpiDeathPerCap: null,
  apiDeathPerCap: null,
}

const sameWorstCasesAndMortalitiesState = {
  state: 'CT',
  name: 'Connecticut',
  knownRaceEthPos: 0.7,
  knownRaceEthDeath: 0.99,
  blackPosPerCap: 21.19,
  blackDeathPerCap: 1.89,
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

const diffWorstCasesAndMortalitiesState = {
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

describe('Components : Social Media Graphics : Race : Header : No Charts', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          // todo add here
          noCharts
          state={state}
          stateName="New Jersey"
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Header : Deaths Only', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          state={deathsOnlyState}
          stateName="New Jersey"
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Header : Cases Only', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          state={casesOnlyState}
          stateName="New Jersey"
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Header : Death Rate Small n', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          state={deathRateSmallNState}
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Header : Same Worst Cases and Mortalities', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          state={sameWorstCasesAndMortalitiesState}
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Social Media Graphics : Race : Header : Different Worst Cases and Mortalities', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header
          state={diffWorstCasesAndMortalitiesState}
          combinedStates={combinedStates}
          lastUpdatedByCtp="20210101"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
