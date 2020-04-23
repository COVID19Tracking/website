const {
  handlers,
  defaultPage,
  fetchParseFix,
  fetchSave,
  processResult,
} = require('../../handlers')

jest.mock('../../handlers/save')

const handlersKeys = Object.keys(handlers)

describe('Build handler provides methods', () => {
  test.each(handlersKeys)('assert %s provides a function', a => {
    expect(typeof handlers[a]).toBe('function')
  })
  it('defines handlers for each file type', () => {
    expect(handlersKeys).toMatchSnapshot()
  })
})

describe('Build process', () => {
  const processResultMock = jest.fn()
  const fixItemsMock = jest.fn()

  /**
   * The following tests check that fetchParseFix receives the
   * correct arguments. The method fetchParseFix can receive an object with
   * either a fetch method or an app string.
   * Files like ./build/datasources/volunteers.js and
   * ./build/datasources/screenshots.js
   * use a fetch() method while ./build/datasources/sheets.js
   * uses an app string.
   */
  it('throws if fetchParseFix is not provided a function that exists in handlers', () => {
    // Test against something not in the handlers array:
    // [json, sheets, yaml, xml]
    const TEST_OBJECT = { app: 'yuck' }
    expect(fetchParseFix.bind(null, TEST_OBJECT)).toThrow()
  })
  it('throws if fetchParseFix is not provided an object with a fetch function', () => {
    // fetch needs to be a function
    const TEST_OBJECT = { fetch: 1 }
    expect(fetchParseFix.bind(null, TEST_OBJECT)).toThrow()
  })
  it('resolves if fetchParseFix is provided a fetch method that resolves ', () => {
    const RESPONSE = 'success'
    const TEST_OBJECT = { fetch: () => Promise.resolve(RESPONSE) }
    return expect(fetchParseFix(TEST_OBJECT)).resolves.toEqual(RESPONSE)
  })
  it('fetchParseFix calls processResult after fetchParseFix resolves', () => {
    const TEST_OBJECT = { fetch: () => Promise.resolve(), fixItems: 5 }
    return fetchParseFix(TEST_OBJECT, processResultMock).then(() => {
      expect(processResultMock.mock.calls.length).toBe(1)
      expect(processResultMock).toHaveBeenCalledWith(TEST_OBJECT.fixItems)
    })
  })
  it('processResult returns identity if not a function', () => {
    const TEST_OBJECT = 1
    expect(processResult(TEST_OBJECT)).toMatchSnapshot()
    return expect(typeof processResult(TEST_OBJECT)).toBe('function')
  })

  it('processResult returns a new function that takes a new value as an argument', () => {
    const [OLD_VALUE, NEW_VALUE] = [1, 2]
    const TEST_ARGS = [fixItemsMock, OLD_VALUE] // call with fixItems mock and oldValue
    const fixItemsFn = processResult(...TEST_ARGS) // the new function returned that takes newValue as argument
    expect(typeof fixItemsFn).toBe('function')
    const newValues = fixItemsFn(NEW_VALUE)
    expect(newValues).toBeUndefined()
    return expect(fixItemsMock).toHaveBeenCalledWith(NEW_VALUE, OLD_VALUE)
  })
  it('defaultPage returns a function that takes a value as an argument', () => {
    const TEST_OBJECT = { path: '/some/path', value: 1 }
    const defaultPageFn = defaultPage(TEST_OBJECT.path) // the new function returned
    const fullPathObject = defaultPageFn(TEST_OBJECT.value)
    expect(typeof defaultPageFn).toBe('function')
    return expect(JSON.stringify(fullPathObject)).toMatchSnapshot()
  })
  it('fetchSave will call a createPages method after fetchParseFix', () => {
    const createPages = jest.fn()
    const TEST_OBJECT = { createPages }
    const fetchParseFixFn = () => Promise.resolve('success')
    return fetchSave(TEST_OBJECT, fetchParseFixFn).then(() => {
      expect(createPages.mock.calls.length).toBe(1)
    })
  })
})
