import React from 'react'
import renderer from 'react-test-renderer'
import {
  PublicationTitle,
  PublicationSource,
} from '../../../components/common/publication'

describe('Components : Common: Publication: Title', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PublicationTitle>
          <p>Sample text</p>
        </PublicationTitle>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Components : Common: Publication: Source', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <PublicationSource>
          <p>Sample text</p>
        </PublicationSource>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
