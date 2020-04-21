import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sampleScreenshots from 'screenshots'
import Screenshots from '../../../../components/pages/state/screenshots'

Enzyme.configure({ adapter: new Adapter() })

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
