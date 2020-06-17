import React from 'react'
import renderer from 'react-test-renderer'
import TableContentBlock from '~components/pages/blog/table-content-block'

describe('Components : Pages : Blog : Table Content Block', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TableContentBlock
          table={`| test  | header | this  | is    | header |
          |-------|--------|-------|-------|--------|
          | 1,000 | 2,000  | 3,000 | 4,000 | 5,000  |
          | N/A   | N/A    | This  | is c  | a cell |
          | Woot  | De     | Doot  | De    | Doo    |`}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
