import React from 'react'
import renderer from 'react-test-renderer'
import AuthorFooter from '~components/pages/blog/author-footer'

describe('Components : Pages : Blog : Byline', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <AuthorFooter
          authors={[
            {
              name: "Name Name",
              twitterLink: "https://twitter.com/namename",
              twitterHandle: "namename",
              link: "https://www.website.com",
              childContentfulAuthorBiographyTextNode: {
                childMarkdownRemark: {
                  html: "<p>Name Name is a an author at <em>A Publication</em>.</p>"
                }
              },
              headshot: {
                file: {
                  fileName: "filename.png"
                },
                resize: {
                  width: 200,
                  height: 200,
                  src: "//images.ctfassets.net/file"
                }
              }
            }
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
