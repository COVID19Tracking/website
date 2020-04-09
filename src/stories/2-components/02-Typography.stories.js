import React from 'react'
import LeadParagraph from '../../components/common/lead-paragraph'
import {
  UnorderedList,
  OrderedList,
  UnstyledList,
} from '../../components/common/lists'
import { FormatDate, FormatNumber } from '../../components/common/format'

const sampleText = `Testing is a crucial part of any public health response, 
and sharing test data is essential to understanding this outbreak. The CDC is 
currently not publishing complete testing data, so we’re doing our best to 
collect it from each state and provide it to the public. The information is 
patchy and inconsistent, so we’re being transparent about what we find and 
how we handle it—the spreadsheet includes our live comments about changing 
data and how we’re working with incomplete information.`

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
  title: 'Typography',
}

export const link = () => <a href="#link">A regular text link</a>

export const linkInText = () => (
  <p>
    From here, you can also{' '}
    <a href="/about-tracker/">learn about our methodology</a>,{' '}
    <a href="/about-team/">see who makes this</a>, and{' '}
    <a href="/notes/">
      find out what information states provide and how we handle it
    </a>
    .
  </p>
)

export const headers = () => (
  <>
    <h1>Header level one</h1>
    <h2>Header level two</h2>
    <h3>Header level three</h3>
    <h4>Header level four</h4>
    <h5>Header level five</h5>
  </>
)

export const paragraph = () => (
  <>
    <p>{sampleText}</p>
    <p>{sampleText}</p>
  </>
)

export const inlineStyles = () => (
  <>
    <p>
      <strong>Now is the time</strong> for all good <em>data collectors</em> to{' '}
      <strike>watch Netflix</strike> come to the aid of their{' '}
      <code>country</code>!
    </p>
  </>
)

inlineStyles.story = {
  parameters: {
    info: {
      text: 'An example of `strong`, `em`, `strike`, and `code` elements.',
    },
  },
}

export const unorderedList = () => (
  <UnorderedList>
    <ExampleList />
  </UnorderedList>
)

export const orderedList = () => (
  <OrderedList>
    <ExampleList />
  </OrderedList>
)

export const unstyledList = () => (
  <UnstyledList>
    <ExampleList />
  </UnstyledList>
)

unstyledList.story = {
  parameters: {
    info: {
      text: 'An unordered list styled to remove any margin or bullets.',
    },
  },
}

export const leadParagraph = () => <LeadParagraph>{sampleText}</LeadParagraph>

export const numberFormat = () => (
  <>
    <p>
      <strong>Number:</strong> <FormatNumber number={13022} />
    </p>
    <p>
      <strong>Number:</strong> <FormatNumber number={false} />
    </p>
  </>
)

numberFormat.story = {
  parameters: {
    info: {
      text:
        'Use the FormatNumber component to add commas to "thousands" and use a default palceholder if the number doesn\'t exist.',
    },
  },
}

export const dateFormat = () => (
  <>
    <p>
      <strong>Without defined format:</strong> <FormatDate date={20200101} />
    </p>
    <p>
      <strong>With the format "yyyy MM d":</strong>{' '}
      <FormatDate date={20200101} format="yyyy MM d" />
    </p>
  </>
)

dateFormat.story = {
  parameters: {
    info: {
      text: `Use the DateFormat component to consistently format dates. We use [Luxon to format dates](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens)`,
    },
  },
}
