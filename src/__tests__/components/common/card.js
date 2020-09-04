import React from 'react'
import renderer from 'react-test-renderer'
import {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
} from '~components/common/card'

describe('Components : Common: Card', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Card title="A sample card">
          <CardBody>This is a card body.</CardBody>
        </Card>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()

    const disclosureTree = renderer
      .create(
        <Card title="A sample card">
          <CardBody>This is a card body.</CardBody>
          <CardDisclosure>
            <CardDisclsoureButton>More information</CardDisclsoureButton>
            <CardDisclosurePanel>
              Additional information that is usually hidden.
            </CardDisclosurePanel>
          </CardDisclosure>
        </Card>,
      )
      .toJSON()
    expect(disclosureTree).toMatchSnapshot()
  })
})
