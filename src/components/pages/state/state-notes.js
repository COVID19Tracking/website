import React, { useState } from 'react'
import marked from 'marked'
import classnames from 'classnames'
import smartypants from 'smartypants'

import Container from '~components/common/container'
import stateNotesStyle from './state-notes.module.scss'

const getBoldedText = text =>
  text.replace(
    /(January|Jan|February|Feb|March|Mar|April|Apr|May|May|June|Jun|July|Jul|August|Aug|September|Sep|Sept|October|Oct|November|Nov|December|Dec) ([0-9]{1,2}|[0-9]{1,2}\/[0-9]{1,2})(,? [0-9]{4})?/gi,
    '**$1 $2$3**',
  )

const StateNotes = ({ notes }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const highlightedNotes = getBoldedText(notes)
  const notesArray = highlightedNotes.split('\n')
  return (
    <Container className={stateNotesStyle.container}>
      <div
        className={classnames(
          'notes-expandable',
          stateNotesStyle.expandable,
          isExpanded && stateNotesStyle.isExpanded,
        )}
      >
        <span className={stateNotesStyle.label}>Notes: </span>
        {notesArray.map(note => (
          <div
            key={note}
            dangerouslySetInnerHTML={{ __html: smartypants(marked(note)) }}
          />
        ))}
        {!isExpanded && <div className={stateNotesStyle.fader} />}
      </div>
      <button
        className={stateNotesStyle.expand}
        type="button"
        aria-hidden
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        {isExpanded ? <>Collapse state note</> : <>Read more</>}{' '}
        <span className={stateNotesStyle.arrow}>
          {isExpanded ? <>↑</> : <>↓</>}
        </span>
      </button>
    </Container>
  )
}

export default StateNotes
