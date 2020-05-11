import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import BlogList from '~components/pages/homepage/blog-list'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allContentfulBlogPost: {
      edges: [
        {
          node: {
            title: 'We’re Launching a New State Grading System',
            slug: 'weve-launched-a-new-state-grading-system',
            authors: [
              {
                name: 'Prajakta Ranade',
                twitterLink: null,
                link: null,
                headshot: null,
              },
              {
                name: 'Harrison Frank',
                twitterLink: null,
                link: null,
                headshot: null,
              },
            ],
            publishDate: 'April 23, 2020',
            lede: {
              lede:
                "We're rolling out a new, more rigorous system for grading the public health data each state reports. This new scoring system sets a more comprehensive and exact standard for evaluating how complete and meaningful each state’s data is.",
            },
          },
        },
        {
          node: {
            title: 'Tracking Race and Ethnicity in the COVID-19 Pandemic ',
            slug: 'tracking-race-and-ethnicity',
            authors: [
              {
                name: 'Alexis Madrigal',
                twitterLink: 'https://twitter.com/alexismadrigal',
                link: 'https://www.theatlantic.com/author/alexis-madrigal',
                headshot: {
                  file: {
                    fileName: 'original.png',
                  },
                  resize: {
                    width: 100,
                    height: 100,
                    src:
                      '//images.ctfassets.net/o2ll9t4ee8tq/3vW1aeLjPFSMAZOqHv9TQS/b4ffb03526cf67724c6732c6e11a6cef/original.png?w=100&fl=progressive&q=50',
                  },
                },
              },
            ],
            publishDate: 'April 15, 2020',
            lede: {
              lede:
                "The COVID-19 pandemic isn't affecting all communities the same way. That's why we're partnering with American University’s Antiracist Research & Policy Center to launch a new project: the COVID Racial Data Tracker.",
            },
          },
        },
      ],
    },
  }))
})

describe('Components : Pages : Homepage : Blog list', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BlogList />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
