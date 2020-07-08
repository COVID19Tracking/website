import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import NationalChart from '~components/pages/race/national-chart'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    covidRaceDataHomepage: {
      whiteMortalityRate: '25.4',
      twoMortalityRate: '2.5',
      otherMortalityRate: '25.1',
      nhpiMortalityRate: '20.9',
      latinXMortalityRate: '29.7',
      blackMortalityRate: '64.7',
      aianMortalityRate: '30.6',
      blackLivesLost: '26,708',
      blackPercentOfDeath: '0.2329585598',
    },
  }))
})

describe('Components : Race : National Chart', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NationalChart />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
