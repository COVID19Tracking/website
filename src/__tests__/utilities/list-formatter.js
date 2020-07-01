import {listSpacer, stringifyList} from '~utilities/list-formatter'


describe('Utilities : listSpacer', () => {
  describe('listSpacer', () => {
    test('returns blank for 1 element', () => {
      const length = 1
      expect(listSpacer({index: 0, length})).toBe('')
    })

    test('formats 2 elements', () => {
      const length = 2
      expect(listSpacer({index: 0, length})).toBe(' & ')
      expect(listSpacer({index: 1, length})).toBe('')
    })

    test('formats 3 elements', () => {
      const length = 3
      expect(listSpacer({index: 0, length})).toBe(', ')
      expect(listSpacer({index: 1, length})).toBe(' & ')
      expect(listSpacer({index: 2, length})).toBe('')
    })

    test('formats more than 3 elements', () => {
      const length = 4
      expect(listSpacer({index: 0, length})).toBe(', ')
      expect(listSpacer({index: 1, length})).toBe(', ')
      expect(listSpacer({index: 2, length})).toBe(' & ')
      expect(listSpacer({index: 3, length})).toBe('')
    })

    test('uses "and" when specified', () => {
      const length = 2
      expect(listSpacer({index: 0, length, useAmpersand: false})).toBe(' and ')
      expect(listSpacer({index: 1, length})).toBe('')
    })
  })

  describe('stringifyList', () =>{
    const items = ['Apple', 'Orange', 'Pear', 'Mango']
    test('stringifies 1 item', () => {
      const formattedItems = stringifyList({arr: [items[0]]})
      expect(formattedItems).toBe('Apple')
    })
    test('stringifies 2 items', () => {
      const formattedItems = stringifyList({arr: [items[0], items[1]]})
      expect(formattedItems).toBe('Apple & Orange')
    })

    test('stringifies 3 items', () => {
      const stringifiedItems = stringifyList({arr: [items[0], items[1], items[2]]})
      expect(stringifiedItems).toBe('Apple, Orange & Pear')
    })

    test('stringifies more than 3 items', () => {
      const stringifiedItems = stringifyList({arr: [items[0], items[1], items[2], items[3]]})
      expect(stringifiedItems).toBe('Apple, Orange, Pear & Mango')
    })

    test('uses "and" when specified', () => {
      const formattedItems = stringifyList({arr: [items[0], items[1]], useAmpersand: false})
      expect(formattedItems).toBe('Apple and Orange')
    })

  })

})
