import React from 'react'
import renderer from 'react-test-renderer'
import Categories from '~components/pages/blog/categories'

describe('Components : Pages : Blog : Categories', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Categories
          categories={[
            {
              name: 'category one',
              slug: 'category-one',
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const treeNoCategories = renderer
      .create(<Categories categories={[]} />)
      .toJSON()
    expect(treeNoCategories).toMatchSnapshot()
  })
})
