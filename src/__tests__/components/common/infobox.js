import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, StaticQuery } from 'gatsby'
import { Infobox, AlertInfobox } from '~components/common/infobox'

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      v1Json: {
        buildTime: '2020-06-02T10:16:47.239Z',
      },
    }),
  )
  useStaticQuery.mockImplementation(() => ({
    v1Json: {
      buildTime: '2020-06-02T10:16:47.239Z',
    },
  }))
})

describe('Components : Common: Infobox: Infobox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Infobox header="Test header">
          <p>Test content</p>
        </Infobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Infobox: Alert infobox', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AlertInfobox header="Test header">
          <p>Test content</p>
        </AlertInfobox>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
