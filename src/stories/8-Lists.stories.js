import React from 'react'
import {
  UnorderedList,
  OrderedList,
  UnstyledList,
} from '../components/common/lists'

const ExampleList = () => (
  <>
    <li>More information</li>
    <li>
      <a href="/">A link to more information</a>
    </li>
    <li>
      <strong>Highlight</strong> - A list item that starts with a bold word
    </li>
  </>
)

export default {
  title: 'Lists',
}

export const UnorderedListStory = () => (
  <UnorderedList>
    <ExampleList />
  </UnorderedList>
)

export const OrderedListStory = () => (
  <OrderedList>
    <ExampleList />
  </OrderedList>
)

export const UnstyledListStory = () => (
  <UnstyledList>
    <ExampleList />
  </UnstyledList>
)
