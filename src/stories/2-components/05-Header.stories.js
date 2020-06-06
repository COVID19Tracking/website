import React from 'react'
import Header from '~components/layout/header'
import DevelopmentWarning from '~components/layout/header/development-warning'

export default {
  title: 'Header',
}

export const header = () => <Header siteTitle="The COVID Tracking Project" />

export const developmentWarning = () => <DevelopmentWarning />

developmentWarning.story = {
  parameters: {
    info: {
      text:
        'Automatically appears unless this is a site built on the master branch.',
    },
  },
}
