import React from 'react'
import renderer from 'react-test-renderer'
import SearchResult from '~components/search/search-result'

describe('Components : Search: Results', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SearchResult title="Test title" url="https://example.com" />)
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeWithChildren = renderer
      .create(
        <SearchResult title="Test title" url="https://example.com">
          <p>A child</p>
        </SearchResult>,
      )
      .toJSON()
    expect(treeWithChildren).toMatchSnapshot()

    const treeWithAuthorAndDate = renderer
      .create(
        <SearchResult
          title="Test title"
          url="https://example.com"
          author="An author"
          publishDate="April 23, 2020"
        />,
      )
      .toJSON()
    expect(treeWithAuthorAndDate).toMatchSnapshot()
  })
})
