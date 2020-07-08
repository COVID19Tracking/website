import React from 'react'
import renderer from 'react-test-renderer'
import Percent from '~components/pages/race/dashboard/percent'

describe('Components : Race : Dashboard : Percent', () => {
  it('renders correctly', () => {
    const zeroTree = renderer.create(<Percent number={0} />).toJSON()
    expect(zeroTree).toMatchSnapshot()

    const nullTree = renderer.create(<Percent number={null} />).toJSON()
    expect(nullTree).toMatchSnapshot()

    const greaterThanOneTree = renderer
      .create(<Percent number={0.2} />)
      .toJSON()
    expect(greaterThanOneTree).toMatchSnapshot()

    const lessThanOneTree = renderer.create(<Percent number={0.00034} />).toJSON()
    expect(lessThanOneTree).toMatchSnapshot()
  })
})
