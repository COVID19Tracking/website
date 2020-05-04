import React from 'react'
import renderer from 'react-test-renderer'
import SearchNoResults from '~components/search/search-no-results'

describe('Components : Search: No results', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SearchNoResults />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
