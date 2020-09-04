import React from 'react'
import renderer from 'react-test-renderer'
import Definitions from '~components/pages/data/definitions'

describe('Components : Pages : Data : Definitions', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Definitions
          definitions={[
            {
              name: 'Test definition A',
              childContentfulDataDefinitionDefinitionTextNode: {
                childMarkdownRemark: {
                  html: 'Test <strong>definition</strong> content A.',
                },
              },
            },
            {
              name: 'Test definition B',
              childContentfulDataDefinitionDefinitionTextNode: {
                childMarkdownRemark: {
                  html: 'Test <strong>definition</strong> content B.',
                },
              },
            },
          ]}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
