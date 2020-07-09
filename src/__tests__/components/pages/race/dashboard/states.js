import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import States from '~components/pages/race/dashboard/states'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allCovidRaceDataCombined: {
      nodes: [
        {
          name: 'AZ',
          state: 'Arizona',
        },
        {
          name: 'DC',
          state: 'Washington, DC',
        },
      ],
    },
    allCovidRaceDataSeparate: {
      nodes: [
        {
          name: 'WA',
          state: 'Washington',
        },
        {
          name: 'GA',
          state: 'Georgia',
        },
      ],
    },
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

describe('Components : Pages : Race : Dashboard : States', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<States />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
