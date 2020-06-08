import slug from '~utilities/slug'

describe('Utilities: Slug', () => {
  test('it creates a valid slug', () => {
    expect(slug('California')).toBe('california')
    expect(slug('New York')).toBe('new-york')
  })
})
