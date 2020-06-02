import React from 'react'
import renderer from 'react-test-renderer'
import VolunteersList from '~components/common/volunteers-list'

const sampleVolunteers = [
  {
    node: {
      name: 'Test Without Website',
      website: false,
    },
  },
  {
    node: {
      name: 'Test With Website',
      website: 'https://example.com',
    },
  },
  {
    node: {
      name: 'Test With Website Without Protocol',
      website: 'example.com',
    },
  },
]

describe('Components : Common : Volunteers list', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<VolunteersList items={sampleVolunteers} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
