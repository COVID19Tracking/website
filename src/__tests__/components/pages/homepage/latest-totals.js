import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import LatestTotals from '~components/pages/homepage/latest-totals'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allCovidUs: {
      nodes: [
        {
          posNeg: 5795728,
          positive: 1005592,
          death: 52525,
        },
      ],
    },
  }))
})

describe('Components : Pages : Homepage : Latest Totals', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LatestTotals />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
