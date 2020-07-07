import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import Totals from '~components/pages/race/totals'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    covidRaceDataHomepage: {
      statesReportingCases: '42',
      statesReportingDeaths: '41',
    },
  }))
})

describe('Components : Race : Totals', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Totals />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
