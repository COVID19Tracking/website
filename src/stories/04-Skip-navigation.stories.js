import React from 'react'
import SkipNavigation from '../components/common/skip-navigation'

export default {
  title: 'Skip Navigation',
  parameters: {
    info: {
      text:
        'Tab over to see the actual link. This is used on all pages to skip navigation for users with assistive technology.',
    },
  },
}

export const skipNavigationLink = () => <SkipNavigation />
