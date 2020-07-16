import React from 'react'
import renderer from 'react-test-renderer'
import UsReportingCount from '~components/pages/race/dashboard/us-reporting-count'

describe('Components : Pages : Race : Dashboard : US Overview', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <UsReportingCount
          statesCasesCount={49}
          statesDeathsCount={48}
          className="css-class-name"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
