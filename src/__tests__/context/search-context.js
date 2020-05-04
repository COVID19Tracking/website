import React from 'react'
import renderer from 'react-test-renderer'
import { types, SearchProvider } from '~context/search-context'

describe('Context : Search : Search types', () => {
  it('has search types', () => {
    expect(types.STATE).toBe('state')
  })
})

describe('Context : Search : Search provider', () => {
  it('has a search provider context', () => {
    const tree = renderer
      .create(
        <SearchProvider>
          <p>child</p>
        </SearchProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
