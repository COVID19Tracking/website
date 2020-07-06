import React from 'react'
import renderer from 'react-test-renderer'
import {
  FormatDate,
  FormatNumber,
  lowercaseMeridiem,
  formatDateToString,
  FormatItemList,
  formatStringList,
} from '~components/utils/format'

describe('Components: Utilities: Format', () => {
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
    expect(date.rendered).toBe('Sat Feb 1 2020 12:00 am')

    const dateWithFormat = renderer
      .create(<FormatDate date={20200201} format="yyyy" />)
      .toTree()
    expect(dateWithFormat.rendered).toBe('2020')
  })

  it('renders lower-cases meridiums', () => {
    expect(lowercaseMeridiem('6:00 AM')).toBe('6:00 am')
  })

  it('renders date strings correctly', () => {
    expect(formatDateToString(20200201)).toBe('Sat Feb 1 2020 12:00 am')
    expect(formatDateToString(20200201, 'yyyy')).toBe('2020')
  })
})

describe('Components: Utilities: Format FormatItemList', () => {
  const items = [<>Apple</>, <>Orange</>, <>Pear</>]
  const keys = ['apple', 'orange', 'pear']
  test('renders 1 item', () => {
    const formattedItems = renderer
      .create(
        <FormatItemList items={items.slice(0, 1)} keys={keys.slice(0, 1)} />,
      )
      .toJSON()
    expect(formattedItems).toMatchSnapshot()
  })
  test('renders 2 items', () => {
    const formattedItems = renderer
      .create(
        <FormatItemList items={items.slice(0, 2)} keys={keys.slice(0, 2)} />,
      )
      .toJSON()
    expect(formattedItems).toMatchSnapshot()
  })

  test('renders 3 items', () => {
    const formattedItems = renderer
      .create(
        <FormatItemList items={items.slice(0, 3)} keys={keys.slice(0, 3)} />,
      )
      .toJSON()
    expect(formattedItems).toMatchSnapshot()
  })

  test('uses "and" when specified', () => {
    const formattedItems = renderer
      .create(
        <FormatItemList
          items={items.slice(0, 2)}
          keys={keys.slice(0, 2)}
          useAmpersand={false}
        />,
      )
      .toJSON()
    expect(formattedItems).toMatchSnapshot()
  })
})

describe('Components: Utilities: Format formatStringList', () => {
  const items = ['Apple', 'Orange', 'Pear']
  test('renders 1 item', () => {
    const formattedItems = formatStringList(items.slice(0, 1))
    expect(formattedItems).toBe('Apple')
  })
  test('renders 2 items', () => {
    const formattedItems = formatStringList(items.slice(0, 2))
    expect(formattedItems).toBe('Apple & Orange')
  })

  test('renders 3 items', () => {
    const formattedItems = formatStringList(items.slice(0, 3))
    expect(formattedItems).toBe('Apple, Orange, & Pear')
  })

  test('uses "and" when specified', () => {
    const formattedItems = formatStringList(items.slice(0, 2), false)
    expect(formattedItems).toBe('Apple and Orange')
  })
})
