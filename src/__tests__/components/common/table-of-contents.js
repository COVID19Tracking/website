import React from 'react'
import renderer from 'react-test-renderer'
import TableOfContents from '~components/common/table-of-contents'

describe('Components : Common: Table of Contents', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TableOfContents
          headings={[
            { id: 'a', value: 'A' },
            { id: 'b', value: 'B' },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
