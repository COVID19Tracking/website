import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'

import Container from '~components/common/container'
import MarkdownContent from '~components/common/markdown-content'
import stateNotesStyle from './state-notes.module.scss'

export default ({ notes }) => (
  <Container narrow className={stateNotesStyle.container}>
    <MarkdownContent html={smartypants(marked(notes))} />
  </Container>
)
