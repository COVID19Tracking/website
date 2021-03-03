import React from 'react'
import marked from 'marked'
import smartypants from 'smartypants'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'

const getBoldedText = text =>
  text.replace(
    /(January|Jan|February|Feb|March|Mar|April|Apr|May|May|June|Jun|July|Jul|August|Aug|September|Sep|Sept|October|Oct|November|Nov|December|Dec) ([0-9]{1,2}|[0-9]{1,2}\/[0-9]{1,2})(,? [0-9]{4})?/gi,
    '**$1 $2$3**',
  )

const StateNotes = ({ notes }) => {
  const highlightedNotes = getBoldedText(notes)
  const notesArray = highlightedNotes
    .split('\n')
    .filter(text => text.trim().length > 0)
  return (
    <Container centered>
      <LongContent>
        {notesArray.map(note => (
          <p
            key={note}
            dangerouslySetInnerHTML={{
              __html: smartypants(marked.inlineLexer(note, [])),
            }}
          />
        ))}
      </LongContent>
    </Container>
  )
}

export default StateNotes
