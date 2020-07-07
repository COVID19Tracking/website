import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import Press from '~components/pages/race/press'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allContentfulRaceProjectNewsArticle: {
      nodes: [
        {
          publication: "The Post",
          id: "10009",
          title: "A race-related covid-19 article",
          publishDate: "May 4, 2020",
          url: "https://crouton.net"
        },
        {
          publication: "The Journal",
          id: "12091",
          title: "covid-19 title",
          publishDate: "March 15, 2020",
          url: "https://the-journal.org"
        },
        {
          publication: "The Press",
          id: "12098",
          title: "covid-19 race headline",
          publishDate: "April 21, 2020",
          url: "https://www.newsorg.com/2020/04/21/covid-19-race-headline/"
        },
      ]
    },
  }))
})

describe('Components : Race : Press', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Press />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
