import React from 'react'
import { FormatDate, FormatNumber } from '~components/utils/format'
import typeSize from './type-size.module.scss'

const sampleText = `Testing is a crucial part of any public health response,
and sharing test data is essential to understanding this outbreak. The CDC is
currently not publishing complete testing data, so we’re doing our best to
collect it from each state and provide it to the public. The information is
patchy and inconsistent, so we’re being transparent about what we find and
how we handle it—the spreadsheet includes our live comments about changing
data and how we’re working with incomplete information.`

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

const typeSizes = []
Object.keys(typeSize).forEach(typeSizeName => {
  if (typeSizeName.search('regular-type-') > -1) {
    typeSizes.push({
      class: typeSize[typeSizeName],
      size: typeSizeName.replace('regular-type-', ''),
    })
  }
})

const boldTypeSizes = []
Object.keys(typeSize).forEach(typeSizeName => {
  if (typeSizeName.search('bold-type-') > -1) {
    boldTypeSizes.push({
      class: typeSize[typeSizeName],
      size: typeSizeName.replace('bold-type-', ''),
    })
  }
})

export const fontSizes = () => (
  <>
    <p>
      We use a set of font sizes that range from 100 to 700. 100 is the smallest
      size and 700 is the largest. These can be used with Sass{' '}
      <code>@include</code>:
      <ul>
        <li>
          Bold: <code>bold-type-size($size)</code>
        </li>
        <li>
          Regular: <code>type-size($size)</code>
        </li>
      </ul>
    </p>
    {typeSizes.map(size => (
      <p className={size.class}>Sample text regular size {size.size}</p>
    ))}

    {boldTypeSizes.map(size => (
      <p className={size.class}>Sample text bold size {size.size}</p>
    ))}
  </>
)

export const headers = () => (
  <>
    <h1>Header level one (48px / 3rem)</h1>
    <h2>Header level two (36px / 2.25rem)</h2>
    <h3>Header level three (30px / 1.8rem)</h3>
    <h4>Header level four (23px / 1.45rem)</h4>
    <h5>Header level five (18px / 1.125rem)</h5>
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
      <strong>With the format &quot;yyyy MM d&quot;:</strong>{' '}
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
