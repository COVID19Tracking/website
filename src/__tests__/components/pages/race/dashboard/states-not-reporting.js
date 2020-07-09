import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import StatesNotReporting from '~components/pages/race/dashboard/states-not-reporting'

describe('Components : Pages : Race : Dashboard : States not Reporting', () => {
  it('renders correctly', () => {
    const content = "<h2>Hi! I'm html content</h2><p>Me too :)</p>"
    const tree = renderer
      .create(<StatesNotReporting content={content} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
