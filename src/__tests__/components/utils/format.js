import React from 'react'
import renderer from 'react-test-renderer'
import {
  FormatDate,
  FormatNumber,
  lowercaseMeridiem,
  formatDateToString,
} from '../../../components/utils/format'

describe('Components : Utilities: Format', () => {
  it('renders formatted numbers correctly with React components', () => {
    const lessThanThousand = renderer
      .create(<FormatNumber number={10} />)
      .toTree()
    expect(lessThanThousand.rendered).toBe('10')

    const moreThanThousand = renderer
      .create(<FormatNumber number={10000} />)
      .toTree()
    expect(moreThanThousand.rendered).toBe('10,000')
  })

  it('renders formatted dates correctly with React components', () => {
    const date = renderer.create(<FormatDate date={20200201} />).toTree()
    expect(date.rendered).toBe('Sat Feb 1 2020 12:00 am ET')

    const dateWithFormat = renderer
      .create(<FormatDate date={20200201} format="yyyy" />)
      .toTree()
    expect(dateWithFormat.rendered).toBe('2020')
  })

  it('renders lower-cases meridiums', () => {
    expect(lowercaseMeridiem('6:00 AM')).toBe('6:00 am')
  })

  it('renders date strings correctly', () => {
    expect(formatDateToString(20200201)).toBe('Sat Feb 1 2020 12:00 am ET')
    expect(formatDateToString(20200201, 'yyyy')).toBe('2020')
  })
})
