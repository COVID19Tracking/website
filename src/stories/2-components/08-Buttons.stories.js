import React from 'react'
import {
  ButtonAnchor,
  ButtonLink,
  Button,
} from '../../components/common/button'

export default {
  title: 'Buttons',
}

export const anchorButton = () => (
  <ButtonAnchor href="/">Regular link </ButtonAnchor>
)

export const bigAnchorButton = () => (
  <ButtonAnchor href="/" big>
    Regular link{' '}
  </ButtonAnchor>
)

export const anchorButtonWithEmoji = () => (
  <ButtonAnchor href="/">
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </ButtonAnchor>
)

anchorButton.story = {
  parameters: {
    info: {
      text:
        'An anchor element `<a>` that is styled to look like a button. Use for external links.',
    },
  },
}
anchorButtonWithEmoji.story = anchorButton.story
bigAnchorButton.story = anchorButton.story

export const linkButton = () => <ButtonLink to="/">Gatsby link</ButtonLink>

export const bigLinkButton = () => (
  <ButtonLink to="/" big>
    Gatsby link
  </ButtonLink>
)

bigLinkButton.story = {
  parameters: {
    info: {
      text:
        'A Gatsby `<Link>` component that is styled to look like a button. Use for internal links.',
    },
  },
}
linkButton.story = bigLinkButton.story

export const button = () => <Button>Hello Button</Button>

export const bigButton = () => <Button big>Hello Button</Button>

bigButton.story = {
  parameters: {
    info: {
      text:
        'A regular `<button>` element. Use for interactions that will not load a new page.',
    },
  },
}
button.story = bigButton.story
