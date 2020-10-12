import React from 'react'
import renderer from 'react-test-renderer'
import TableOfContents from '~components/common/table-of-contents'

describe('Components : Common: Table of Contents', () => {
  it('renders correctly', () => {
    const content = [
      {
        nodeType: 'paragraph',
        content: [
          {
            nodeType: 'text',
            value: 'abc',
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
      {
        nodeType: 'heading-2',
        content: [
          {
            nodeType: 'text',
            value: 'abc',
            marks: [],
            data: {},
          },
          {
            nodeType: 'hyperlink',
            content: [
              {
                nodeType: 'text',
                value: 'abc',
                marks: [],
                data: {},
              },
            ],
            data: {
              uri:
                'https://covidtracking.com/about-data/faq#where-do-you-get-your-data',
            },
          },
          {
            nodeType: 'text',
            value: 'abc',
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
      {
        nodeType: 'heading-2',
        content: [
          {
            nodeType: 'text',
            value: 'abc',
            marks: [],
            data: {},
          },
          {
            nodeType: 'hyperlink',
            content: [
              {
                nodeType: 'text',
                value: 'abc',
                marks: [],
                data: {},
              },
            ],
            data: {
              uri:
                'https://covidtracking.com/about-data/faq#why-doesnt-your-data-match-what-i-see-on-the-official-covid-19-page-for-my-state',
            },
          },
          {
            nodeType: 'text',
            value: 'abc',
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
    ]
    const tree = renderer.create(<TableOfContents content={content} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
