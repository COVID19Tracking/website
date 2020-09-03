import React from 'react'
import SkipNavigation from '~components/utils/skip-navigation'

export default {
  title: 'Accessibility utilities',
}

export const skipNavigation = () => <SkipNavigation />

skipNavigation.story = {
  parameters: {
    info: {
      text:
        'Tab over to see the actual link. This is used on all pages to skip navigation for users with assistive technology.',
    },
  },
}
