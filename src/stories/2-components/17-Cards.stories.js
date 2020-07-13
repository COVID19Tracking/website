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

export const cardWithLink = () => (
  <Card title="Card Title" link={<a href="something">Some more</a>}>
    <CardBody>
      <p>This is some conetnt within a card.</p>
    </CardBody>
  </Card>
)

cardWithLink.story = {
  parameters: {
    info: {
      text: `A card with links to more information.`,
    },
  },
}

export const cardWithDisclosure = () => (
  <Card title="Card Title">
    <CardBody>
      <p>This is some conetnt within a card.</p>
      <CardDisclosure>
        <CardDisclsoureButton
          closed="More information"
          expanded="Hide more information"
        />
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
