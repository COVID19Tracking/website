import React from 'react'
import renderer from 'react-test-renderer'
import * as Gatsby from 'gatsby'
import { StaticQuery } from 'gatsby'
import DataWarning from '~components/layout/header/data-warning'

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')

describe('Components : Layout : Data warning', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('is hidden if the snippet is empty', () => {
    useStaticQuery.mockImplementation(() => ({
      contentfulSnippet: {
        contentful_id: '1234',
        name: 'data-warning',
        slug: 'data-warning',
        content: {
          content: '',
        },
      },
    }))
    const tree = renderer.create(<DataWarning />).toJSON()
    expect(tree).toBeNull()
  })

  it('is displayed if there is content', () => {
    useStaticQuery.mockImplementation(() => ({
      contentfulSnippet: {
        contentful_id: '1234',
        name: 'data-warning',
        slug: 'data-warning',
        content: {
          content: 'There are some data issues and **we are on it**.',
        },
      },
    }))
    const tree = renderer.create(<DataWarning />).toJSON()
    expect(tree).not.toBeNull()
    expect(tree).toMatchSnapshot()
  })
})
