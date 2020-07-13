import React from 'react'
import renderer from 'react-test-renderer'
import { Byline } from '~components/pages/blog/byline'

describe('Components : Pages : Blog : Byline', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Byline
          authors={[
            {
              name: 'test name',
              twitterLink: 'https://twitter.com/test',
              headshot: {
                file: {
                  fileName: 'file.png',
                },
                resize: {
                  src: '//images.ctfassets.net/arandomfile',
                },
              },
            },
          ]}
          published="Aug 1 2020"
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeNoLink = renderer
      .create(
        <Byline
          authors={[
            {
              name: 'test name',
            },
          ]}
          published="Aug 1 2020"
          updated="2020-07-13T18:22:44Z"
        />,
      )
      .toJSON()
    expect(treeNoLink).toMatchSnapshot()
  })
})
