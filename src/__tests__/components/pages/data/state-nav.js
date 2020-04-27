import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import StateNav, {
  getStateId,
  selectFirstItemOnKeyDown,
} from '../../../../components/pages/data/state-nav'

jest.mock('@reach/combobox', () => {
  return {
    Combobox: ({ children }) => <div>{children}</div>,
    ComboboxInput: () => <input type="text" />,
    ComboboxList: ({ children }) => <ul>{children}</ul>,
    ComboboxOption: ({ children }) => <li>{children}</li>,
    ComboboxPopover: ({ children }) => <div>{children}</div>,
  }
})

const stateList = [
  {
    node: { state: 'AK', name: 'Alaska' },
  },
  {
    node: { state: 'CA', name: 'California' },
  },
]

describe('Components : Pages : Data : Navigation with JS enabled', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StateNav stateList={stateList} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('can filter on user input', () => {
    const wrapper = shallow(<StateNav stateList={stateList} />)

    const input = wrapper.find('#jump-to-state')
    input.simulate('change', { target: { value: 'ala' } })
    expect(wrapper.exists('#state-nav-results-popover')).toBe(true)

    input.simulate('change', { target: { value: '' } })
    expect(wrapper.exists('#state-nav-results-popover')).toBe(false)
  })

  it('search for states', () => {
    const stateNode = getStateId(stateList, 'Alaska')
    expect(JSON.stringify(stateNode)).toMatchSnapshot()
  })

  it('select first item on key down will just return if key !== enter', () => {
    const item = selectFirstItemOnKeyDown({ key: 'ctrl' }, [])
    expect(item).toBeUndefined()
  })

  it('set window location to first result', () => {
    const mockSetWindowLocation = jest.fn()
    selectFirstItemOnKeyDown(
      { key: 'Enter' },
      [{ state: 'Alabama' }],
      mockSetWindowLocation,
    )
    expect(mockSetWindowLocation.mock.calls.length).toBe(1)
    expect(mockSetWindowLocation).toHaveBeenCalledWith('state-alabama')
  })
})
