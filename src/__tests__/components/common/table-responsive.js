import React from 'react'
import renderer from 'react-test-renderer'
import TableResponsive from '~components/common/table-responsive'

describe('Components : Common: Responsive table', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TableResponsive
          labels={[
            {
              field: 'date',
              label: 'Date',
              noWrap: true,
              format: item => `formatted: ${item}`,
            },
            {
              label: 'Data',
              field: 'data',
            },
          ]}
          data={[
            { date: '2020-08-03', data: 'A' },
            { date: '2020-08-04', data: 'B' },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
