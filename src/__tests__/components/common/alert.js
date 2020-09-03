import React from 'react'
import renderer from 'react-test-renderer'
import Alert from '~components/common/alert'

describe('Components : Common: Alert', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <>
          <Alert header="Test header">
            <p>Test content</p>
          </Alert>
          <Alert header="Test header" fullSize>
            <p>Test content</p>
          </Alert>
        </>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
