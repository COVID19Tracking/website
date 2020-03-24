import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

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
