import React from 'react'
import renderer from 'react-test-renderer'
import Definitions from '~components/pages/data/definitions'

const definitions = [
  {
    name: 'Test definition A',
    fieldName: 'a',
    childContentfulDataDefinitionDefinitionTextNode: {
      childMarkdownRemark: {
        html: 'Test <strong>definition</strong> content A.',
      },
    },
  },
  {
    name: 'Test definition B',
    fieldName: 'b',
    childContentfulDataDefinitionDefinitionTextNode: {
      childMarkdownRemark: {
        html: 'Test <strong>definition</strong> content B.',
      },
    },
  },
]

describe('Components : Pages : Data : Definitions', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Definitions definitions={definitions} order={['a', 'b']} />)
      .toJSON()
    expect(tree).toMatchSnapshot()

    const reverseOrderTree = renderer
      .create(<Definitions definitions={definitions} order={['b', 'a']} />)
      .toJSON()
    expect(reverseOrderTree).toMatchSnapshot()
  })
})
