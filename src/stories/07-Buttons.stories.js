import React from 'react'
import { ButtonAnchor, ButtonLink, Button } from '../components/common/button'

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
export const linkButton = () => <ButtonLink to="/">Gatsby link</ButtonLink>

export const bigLinkButton = () => (
  <ButtonLink to="/" big>
    Gatsby link
  </ButtonLink>
)

export const button = () => <Button>Hello Button</Button>

export const bigButton = () => <Button big>Hello Button</Button>
