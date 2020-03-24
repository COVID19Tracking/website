import React from 'react'
import SecondaryNavigation from '../components/layout/secondary-navigation'

const exampleNavigation = [
  {
    url: 'page-a',
    title: 'Page A',
  },
  {
    url: 'page-b',
    title: 'Page B',
  },
  {
    url: 'page-c',
    title: 'Page C',
  },
]

export default {
  title: 'Secondary navigation',
}

export const SecondaryNavigationStory = () => (
  <SecondaryNavigation navigation={exampleNavigation} />
)
