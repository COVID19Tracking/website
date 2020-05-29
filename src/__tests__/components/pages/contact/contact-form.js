import React from 'react'
import renderer from 'react-test-renderer'
import ContactForm from '../../../../components/pages/contact/contact-form'

describe('Components : Common: Contact form', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ContactForm name="test-form" message="Test message" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
