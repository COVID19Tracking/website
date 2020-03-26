import React from 'react'
import DevelopmentWarning from '../components/layout/development-warning'

export default {
  title: 'Development warning',
  parameters: {
    info: {
      text:
        'Automatically appears unless this is a site built on the master branch.',
    },
  },
}

export const warning = () => <DevelopmentWarning />
