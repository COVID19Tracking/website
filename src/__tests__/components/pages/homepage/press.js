import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import Press from '../../../../components/pages/homepage/press'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allHomepagePressYaml: {
      edges: [
        {
          node: {
            name: 'test A',
            logo: 'test-a.png',
            width: 300,
            featured: false,
          },
        },
        {
          node: {
            name: 'test B',
            logo: 'test-b.png',
            width: 300,
            featured: true,
          },
        },
      ],
    },
    allCovidPress: {
      edges: [
        {
          node: {
            id: "5ce2bc4d-3d24-5e1a-91bb-a30d098ccfc7",
            title: "Coronavirus testin: California continues to lag compared to other states",
            url: "https://abc7news.com/coronavirus-testing-california-covid-19-in-tests-ca-pandemic/6111601/",
            publication: "ABC 7 News",
            publishDate: "April 18, 2020"
          }
        },
        {
          node: {
            id: "68c6166f-7498-5eaf-bd6a-178a5e13acf2",
            title: "Amid flurry of national coronavirus data, Massachusetts remains a hot spot of infection",
            url: "https://www.bostonglobe.com/2020/04/18/nation/amid-flurry-national-coronavirus-data-massachusetts-remains-hot-spot-infection/",
            publication: "The Boston Globe",
            publishDate: "April 18, 2020"
          }
        },
      ]
    }
  }))
})

describe('Components : Pages : Homepage : Press', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Press />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
