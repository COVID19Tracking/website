import React from 'react'
import renderer from 'react-test-renderer'
import data from 'sample-chart-data'
import TableauChart from '~components/charts/tableau'

describe('Components : Charts: Tableau chart', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TableauChart
          id="test"
          viewUrl="https://public.tableau.com"
          height={700}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const mobileTree = renderer
      .create(
        <TableauChart
          id="test"
          viewUrl="https://public.tableau.com"
          height={700}
          viewUrlMobile="https://public.tableau.com"
        />,
      )
      .toJSON()
    expect(mobileTree).toMatchSnapshot()
  })
})
