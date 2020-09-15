import React from 'react'
import renderer from 'react-test-renderer'
import StateNotes from '~components/pages/state/state-notes'

const sampleText = `This is the first paragraph for June 13.

This second line tests years, as in July 14, 2020.

You can also format with August 18 2020, I guess that is fine too.`

describe('Components : Pages : State : State notes', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StateNotes notes={sampleText} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
