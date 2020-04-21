import {
  getStateName,
  formatDate,
  formatNumber,
} from '../../utilities/visualization'

describe('Utilities : Visualization', () => {
  test('getStateName returns name', () => {
    expect(getStateName('CA')).toBe('California')
  })
  test('formatNumber formats correctly', () => {
    expect(formatNumber(10000)).toBe('10,000')
    expect(formatNumber(10)).toBe('10')
  })

  test('formatDate formats correctly', () => {
    expect(formatDate(new Date('2020-03-03'))).toBe('Mar  2')
  })
})
