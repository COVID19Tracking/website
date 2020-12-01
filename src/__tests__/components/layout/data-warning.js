import React from 'react'
import renderer from 'react-test-renderer'
import { StaticQuery } from 'gatsby'
import DataWarning from '~components/layout/header/data-warning'

describe('Components : Layout : Data warning', () => {
  it('is hidden if the snippet is empty', () => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        contentfulSnippet: {
          contentful_id: '1234',
          name: 'data-warning',
          slug: 'data-warning',
          content: {
            content: '',
          },
        },
      }),
    )
    const tree = renderer.create(<DataWarning />).toJSON()
    expect(tree).toBeNull()
  })

  it('is displayed if there is content', () => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        contentfulSnippet: {
          contentful_id: '1234',
          name: 'data-warning',
          slug: 'data-warning',
          content: {
            content: 'There is a data issue and **we are on it**.',
          },
        },
      }),
    )
    const tree = renderer.create(<DataWarning />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
