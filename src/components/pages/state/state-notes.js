import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'

import Container from '~components/common/container'
import MarkdownContent from '~components/common/markdown-content'
import stateNotesStyle from './state-notes.module.scss'

const getBoldedText = text => {
  const re = new RegExp(
    `((?:January|Jan|February|Feb|March|Mar|April|Apr|May|May|June|Jun|July|Jul|August|Aug|September|Sep|Sept|October|Oct|November|Nov|December|Dec).? [0-9]{1,2}|[0-9]{1,2}/[0-9]{1,2})((,).? 2020)?`,
    'gi',
  )
  const parts = text.split(re)
  const highlightedParts = parts.map(part => {
    console.log(part)
    if (part === ' 2020') {
      return ' **2020**'
    }
    if (part === ', 2020') {
      return ', **2020**'
    }
    return re.test(part) ? `**${part}**` : part
  })
  return highlightedParts.join('').replace(/,,/g, ',')
}

export default ({ notes, isNarrow = true }) => {
  const highlightedNotes = getBoldedText(notes)
  const notesArray = highlightedNotes.split('\n')
  return (
    <Container narrow={isNarrow} className={stateNotesStyle.container}>
      <span className={stateNotesStyle.label}>Notes: </span>
      {notesArray.map(note => (
        <MarkdownContent key={note} html={smartypants(marked(note))} />
      ))}
    </Container>
  )
}
