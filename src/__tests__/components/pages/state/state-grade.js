import React from 'react'
import renderer from 'react-test-renderer'
import StateGrade from '../../../../components/pages/state/state-grade'

describe('Components : Pages : State : State grade', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StateGrade letterGrade="a" />).toJSON()
    expect(tree).toMatchSnapshot()

    const naTree = renderer.create(<StateGrade />).toJSON()
    expect(naTree).toMatchSnapshot()
  })
})
