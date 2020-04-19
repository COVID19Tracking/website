import React from 'react'
import renderer from 'react-test-renderer'
import Byline from '../../../../components/pages/blog/byline'

describe('Components : Pages : Blog : Byline', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Byline
          author={{
            name: 'test name',
            twitterLink: 'https://twitter.com/test',
          }}
          date="Aug 1 2020"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
