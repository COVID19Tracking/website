import React from 'react'
import PressList from '~components/common/press-list'

export default {
  title: 'Press List',
}

const testData = [
  {
    node: {
      id: '1234567-1234-1234-1234-12345678900',
      title: 'Jane Invited to Dine At Netherfield',
      url: 'https://en.wikipedia.org/wiki/Pride_and_Prejudice',
      publication: 'Pride and Prejudice',
      publishDate: 'November 12, 1813',
    },
  },
  {
    node: {
      id: '7654321-1234-1234-1234-12345678900',
      title: 'Lydia Elopes, Family Shocked',
      url: 'https://en.wikipedia.org/wiki/Pride_and_Prejudice',
      publication: 'Pride and Prejudice',
      publishDate: 'August 1, 1813',
    },
  },
]

export const pressList = () => <PressList items={testData} />

testData.story = {
  parameters: {
    info: {
      text: 'Used to list press.',
    },
  },
}
