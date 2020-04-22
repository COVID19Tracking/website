import React from 'react'
import renderer from 'react-test-renderer'
import StateNav from '../../../../components/pages/data/state-nav'

jest.mock('@reach/combobox', () => {
  return {
    Combobox: ({ children }) => <div>{children}</div>,
    ComboboxInput: () => <input type="text" />,
    ComboboxList: ({ children }) => <ul>{children}</ul>,
    ComboboxOption: ({ children }) => <li>{children}</li>,
    ComboboxPopover: ({ children }) => <div>{children}</div>,
  }
})

describe('Components : Pages : Data : Navigation with JS enabled', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StateNav
          stateList={[
            {
              node: { state: 'AK', name: 'Alaska' },
            },
            {
              node: { state: 'CA', name: 'California' },
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
