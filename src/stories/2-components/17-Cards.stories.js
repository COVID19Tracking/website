import React from 'react'
import {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
} from '~components/common/card'

export default {
  title: 'Cards',
}

export const card = () => (
  <Card title="Card Title">
    <CardBody>
      <p>This is some conetnt within a card.</p>
    </CardBody>
  </Card>
)

card.story = {
  parameters: {
    info: {
      text: `A single UI element used to display short information.`,
    },
  },
}

export const cardWithDisclosure = () => (
  <Card title="Card Title">
    <CardBody>
      <p>This is some conetnt within a card.</p>
      <CardDisclosure>
        <CardDisclsoureButton>More information</CardDisclsoureButton>
        <CardDisclosurePanel>This is more info</CardDisclosurePanel>
      </CardDisclosure>
    </CardBody>
  </Card>
)

cardWithDisclosure.story = {
  parameters: {
    info: {
      text: `A card with hidden content`,
    },
  },
}
