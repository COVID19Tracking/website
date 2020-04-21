import React from 'react'
import renderer from 'react-test-renderer'
import Alert from '../../../components/utils/alert'

describe('Accessibility alert', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Alert>
          <p>This is an important message.</p>
        </Alert>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
