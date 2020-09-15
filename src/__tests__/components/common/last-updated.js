import React from 'react'
import renderer from 'react-test-renderer'
import LastUpdated from '~components/common/last-updated'

describe('Components : Common: Last updated', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <>
          <LastUpdated national date="Aug 18 2020" />
          <LastUpdated date="Aug 18 2020" />
        </>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
