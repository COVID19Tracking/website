import React from 'react'
import renderer from 'react-test-renderer'
import VolunteerForm from '../../../../components/pages/contact/volunteer-form'

describe('Components : Common: Contact form', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<VolunteerForm />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
