import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import {
  StateTableHeader,
  StateTableBody,
} from '~components/pages/race/dashboard/table'

describe('Components : Pages : Race : Dashboard : Table Header', () => {
  it('renders correctly', () => {
    const headerTree = renderer
      .create(
        <StateTableHeader
          groupTitle={'Title'}
          noDeaths={false}
          noPositives={false}
        />,
      )
      .toJSON()
    expect(headerTree).toMatchSnapshot()
  })
})

describe('Components : Pages : Race : Dashboard : Table Content', () => {
  it('renders correctly', () => {
    const rows = [
      {
        group: 'Black or African American alone',
        population: 0.23,
        positive: {
          disparity: true,
          caution: true,
          value: 0.456,
          note: {
            value: 'Example note.',
            index: 0,
          },
        },
        death: {
          disparity: true,
          caution: true,
          value: 0.376,
          note: {
            value: 'This is a note!',
            index: 1,
          },
        },
      },
    ]
    const contentTree = renderer
      .create(
        <StateTableBody
          state={'California'}
          stateAbbr={'CA'}
          rows={rows}
          type={'race'}
        />,
      )
      .toJSON()
    expect(contentTree).toMatchSnapshot()
  })
})
