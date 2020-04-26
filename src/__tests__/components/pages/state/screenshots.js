import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import sampleScreenshots from 'screenshots'
import Screenshots from '../../../../components/pages/state/screenshots'

describe('Components : Pages : State : Screenshots', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Screenshots date={20200417} screenshots={sampleScreenshots} />)
      .toJSON()
    expect(tree).toMatchSnapshot()

    expect(
      shallow(
        <Screenshots date={20200417} screenshots={sampleScreenshots} />,
      ).find('li').length,
    ).toBe(2)
  })
})
