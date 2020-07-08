import React from 'react'
import renderer from 'react-test-renderer'
import PercentageOverview from '~components/pages/race/dashboard/percentage-overview'

describe('Components : Race : Dashboard : Percentage Overview', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PercentageOverview
          stateName={'New Mexico'}
          dataType={'race'}
          casePercent={0.22}
          deathPercent={0.043}
          className={'race-class'}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const nullTree = renderer
      .create(
        <PercentageOverview
          stateName={'New Mexico'}
          dataType={'race'}
          className={'race-class'}
        />,
      )
      .toJSON()
    expect(nullTree).toMatchSnapshot()

    const nullDeathTree = renderer
      .create(
        <PercentageOverview
          stateName={'New Mexico'}
          dataType={'race'}
          casePercent={0.22}
          className={'race-class'}
        />,
      )
      .toJSON()
    expect(nullDeathTree).toMatchSnapshot()
  })
})
