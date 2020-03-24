import React from 'react'
import { ButtonAnchor, Button } from '../components/common/button'

export default {
  title: 'Buttons',
}

export const ButtonAnchorStory = () => (
  <ButtonAnchor href="/">Gatsby Link </ButtonAnchor>
)

export const ButtonAnchorBigStory = () => (
  <ButtonAnchor href="/" big>
    Gatsby Link{' '}
  </ButtonAnchor>
)

export const ButtonAnchorEmojiStory = () => (
  <ButtonAnchor href="/">
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </ButtonAnchor>
)

export const ButtonStory = () => <Button>Hello Button</Button>

export const ButtonBigStory = () => <Button big>Hello Button</Button>

export const ButtonEmojiStory = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
