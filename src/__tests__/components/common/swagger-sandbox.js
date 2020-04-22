import React from 'react'
import renderer from 'react-test-renderer'
import SwaggerUI from 'swagger-ui'
import SwaggerSandbox from '../../../components/common/swagger-sandbox'

beforeEach(() => {
  window.SwaggerUI = SwaggerUI;
})

describe('Components : Common: Swagger sandbox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SwaggerSandbox />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

afterEach(() => {
  delete window.SwaggerUI
})