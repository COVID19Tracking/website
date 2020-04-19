import React from 'react'
import renderer from 'react-test-renderer'
import { StaticQuery } from 'gatsby'
import DevelopmentWarning from '../../../components/layout/development-warning'

describe('Components : Layout : Development warning', () => {
  it('is hidden in production', () => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        site: {
          siteMetadata: {
            production: true,
          },
        },
      }),
    )
    const tree = renderer.create(<DevelopmentWarning />).toJSON()
    expect(tree).toBeNull()
  })

  it('is displayed in production', () => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        site: {
          siteMetadata: {
            production: true,
          },
        },
      }),
    )
    const tree = renderer.create(<DevelopmentWarning />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
