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

const StateNotes = ({ stateName, notes }) => {
  const highlightedNotes = getBoldedText(notes)
  const notesArray = highlightedNotes
    .split('\n')
    .filter(text => text.trim().length > 0)
  return (
    <Container centered>
      <LongContent>
        <p>
          When {stateName} reports no data, several days of data, or unusual
          data (such as decreases in values that should increase), our
          volunteers note it here on the date the anomaly occurred. We also note
          here changes in our own methodology that affect the data.
        </p>
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
