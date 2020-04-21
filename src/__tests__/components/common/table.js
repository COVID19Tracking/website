import React from 'react'
import renderer from 'react-test-renderer'
import Table from '../../../components/common/table'

describe('Components : Common: Table', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Table>
          <thead>
            <tr>
              <th>Column A</th>
              <th>Column B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item A</td>
              <td>Item B</td>
            </tr>
            <tr>
              <td>Item A</td>
              <td>Item B</td>
            </tr>
            <tr>
              <td>Item A</td>
              <td>Item B</td>
            </tr>
          </tbody>
        </Table>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
