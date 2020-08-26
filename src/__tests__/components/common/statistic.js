import React from 'react'
import renderer from 'react-test-renderer'
import { Statistic, StatisticGroup } from '~components/common/statistic'

describe('Components : Common: Statistic', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Statistic title="Test statistic" value={400} />)
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeSuffix = renderer
      .create(<Statistic title="Test statistic" value={400} suffix=" folks" />)
      .toJSON()
    expect(treeSuffix).toMatchSnapshot()
    const treeGroup = renderer
      .create(
        <StatisticGroup>
          <Statistic title="Test statistic" value={400} suffix=" folks" />
          <Statistic title="Test statistic" value={400} suffix=" two" />
        </StatisticGroup>,
      )
      .toJSON()
    expect(treeGroup).toMatchSnapshot()
  })
})
