import React from 'react'
import { ButtonAnchor, Button } from '../components/common/button'

export default {
  title: 'Buttons',
}

export const anchorButton = () => (
  <ButtonAnchor href="/">Gatsby Link </ButtonAnchor>
)

export const bigAnchorButton = () => (
  <ButtonAnchor href="/" big>
    Gatsby Link{' '}
  </ButtonAnchor>
)

export const anchorButtonWithEmoji = () => (
  <ButtonAnchor href="/">
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </ButtonAnchor>
)

export const button = () => <Button>Hello Button</Button>

export const bigButton = () => <Button big>Hello Button</Button>
