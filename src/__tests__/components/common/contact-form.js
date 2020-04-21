import React from 'react'
import renderer from 'react-test-renderer'
import ContactFrom from '../../../components/common/contact-form'

describe('Components : Common: Contact form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ContactFrom name="test-form" message="Test message" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
