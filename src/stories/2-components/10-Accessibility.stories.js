import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import Alert from '@reach/alert'
import SkipNavigation from '../../components/utils/skip-navigation'

export default {
  title: 'Accessibility utilities',
}

export const visuallyHideComponent = () => (
  <p>
    This is a paragraph with some hidden text{' '}
    <a href="/">
      in this link <VisuallyHidden>ta da!</VisuallyHidden>
    </a>
  </p>
)

export const alert = () => (
  <Alert>Woah, you should pay attention to this!</Alert>
)

export const skipNavigation = () => <SkipNavigation />

skipNavigation.story = {
  parameters: {
    info: {
      text:
        'Tab over to see the actual link. This is used on all pages to skip navigation for users with assistive technology.',
    },
  },
}
