import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'

import Container from '~components/common/container'
import stateNotesStyle from './state-notes.module.scss'

const getBoldedText = text =>
  text.replace(
    /(January|Jan|February|Feb|March|Mar|April|Apr|May|May|June|Jun|July|Jul|August|Aug|September|Sep|Sept|October|Oct|November|Nov|December|Dec) ([0-9]{1,2}|[0-9]{1,2}\/[0-9]{1,2})(,? [0-9]{4})?/gi,
    '**$1 $2$3**',
  )

const StateNotes = ({ notes, isNarrow = true }) => {
  const highlightedNotes = getBoldedText(notes)
  const notesArray = highlightedNotes.split('\n')
  return (
    <Container narrow={isNarrow} className={stateNotesStyle.container}>
      <span className={stateNotesStyle.label}>Notes: </span>
      {notesArray.map(note => (
        <div
          key={note}
          dangerouslySetInnerHTML={{ __html: smartypants(marked(note)) }}
        />
      ))}
    </Container>
  )
}

export default StateNotes
