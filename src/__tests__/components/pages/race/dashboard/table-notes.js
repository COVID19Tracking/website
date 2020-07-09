import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import TableNotes from '~components/pages/race/dashboard/table-notes'

describe('Components : Pages : Race : Dashboard : Table Notes', () => {
  it('renders correctly', () => {
    const headerTree = renderer
      .create(
        <TableNotes
          state={'NV'}
          stateName={'Nevada'}
          type={'ethnicity'}
          groupedNotes={[
            'This is a note',
            '  This is another note with trailing space   ',
          ]}
        />,
      )
      .toJSON()
    expect(headerTree).toMatchSnapshot()
  })
})
