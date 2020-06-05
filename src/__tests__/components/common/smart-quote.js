import React from 'react'
import renderer from 'react-test-renderer'
import SmartQuote from '~components/common/smart-quote'

describe('Components : Common: Smart quote', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SmartQuote>Don&#8217;t worry</SmartQuote>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
