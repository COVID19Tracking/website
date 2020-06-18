import React from 'react'
import renderer from 'react-test-renderer'
import mockJSON from 'sample-openapi'
import Fields from '~components/pages/data/download/fields'

jest.mock('../../../../../../_api/v1/openapi.json', () => mockJSON)

describe('Components : Pages : Data : Download : Fields', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Fields schema="States" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
