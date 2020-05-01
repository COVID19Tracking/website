import React from 'react'
import renderer from 'react-test-renderer'
import SearcResultSection from '~components/search/search-result-section'

const results = {
  nbHits: 1,
  hits: [{}],
}

describe('Components : Search: Result section', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SearcResultSection
          query="test"
          results={results}
          itemKey={() => 'key'}
          itemTitle={() => 'test'}
          itemUrl={() => 'https://example.com'}
        />,
      )
      .toJSON()

    expect(tree).toMatchSnapshot()

    const contentTree = renderer
      .create(
        <SearcResultSection
          query="test"
          results={results}
          itemKey={() => 'key'}
          itemTitle={() => 'test'}
          itemUrl={() => 'https://example.com'}
          itemContent={() => <p>Content</p>}
        />,
      )
      .toJSON()

    expect(contentTree).toMatchSnapshot()

    const noResults = renderer
      .create(
        <SearcResultSection
          query="test"
          results={{
            nbHits: 0,
            hits: [],
          }}
          itemKey={() => 'key'}
          itemTitle={() => 'test'}
          itemUrl={() => 'https://example.com'}
        />,
      )
      .toJSON()

    expect(noResults).toMatchSnapshot()
  })
})
