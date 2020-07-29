import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'

import Container from '~components/common/container'
import MarkdownContent from '~components/common/markdown-content'
import stateNotesStyle from './state-notes.module.scss'

const getBoldedText = text => {
  const re = new RegExp(
    `((?:January|Jan|February|Feb|March|Mar|April|Apr|May|May|June|Jun|July|Jul|August|Aug|September|Sep|Sept|October|Oct|November|Nov|December|Dec).? [0-9]{1,2}|[0-9]{1,2}/[0-9]{1,2})`,
    'gi',
  )
  const parts = text.split(re)
  const highlightedParts = parts.map(part =>
    re.test(part) ? `**${part}**` : part,
  )
  return highlightedParts.join('')
}

export default ({ notes, isNarrow = true }) => {
  const highlightedNotes = getBoldedText(notes)
  const notesAsHtml = smartypants(marked(highlightedNotes))
  return (
    <Container narrow={isNarrow} className={stateNotesStyle.container}>
      <span className={stateNotesStyle.label}>Notes: </span>
      <MarkdownContent html={notesAsHtml} />
    </Container>
  )
}
