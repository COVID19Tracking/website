import React from 'react'
import Alert from '~components/common/alert'

export default {
  title: 'Alert',
}

export const alert = () => <Alert header="This is an alert">Be careful!</Alert>

alert.story = {
  parameters: {
    info: {
      text: 'An alert item to notify users of an error.',
    },
  },
}
