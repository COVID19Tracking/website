import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import TableSymbolKey from '~components/pages/race/dashboard/table-symbol-key'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    disparityNote: {
      contentful_id: 'aNeWRaNdoMSTrinG',
      childContentfulSnippetContentTextNode: {
        childMarkdownRemark: {
          html: '<h2>Content</h2><p>More disparity snippet content</p>',
        },
      },
    },
    comparibleNote: {
      contentful_id: 'RaNdoMSTrinG',
      childContentfulSnippetContentTextNode: {
        childMarkdownRemark: {
          html: '<h2>Content</h2><p>More comparible snippet content</p>',
        },
      },
    },
  }))
})

describe('Components : Pages : Race : Dashboard : Table Symbol Key', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TableSymbolKey state="NV" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
